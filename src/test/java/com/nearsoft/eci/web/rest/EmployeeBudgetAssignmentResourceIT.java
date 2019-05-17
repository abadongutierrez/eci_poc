package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.EciApp;
import com.nearsoft.eci.domain.EmployeeBudgetAssignment;
import com.nearsoft.eci.repository.EmployeeBudgetAssignmentRepository;
import com.nearsoft.eci.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.nearsoft.eci.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link EmployeeBudgetAssignmentResource} REST controller.
 */
@SpringBootTest(classes = EciApp.class)
public class EmployeeBudgetAssignmentResourceIT {

    private static final Integer DEFAULT_USAGE = 0;
    private static final Integer UPDATED_USAGE = 1;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmployeeBudgetAssignmentRepository employeeBudgetAssignmentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restEmployeeBudgetAssignmentMockMvc;

    private EmployeeBudgetAssignment employeeBudgetAssignment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeeBudgetAssignmentResource employeeBudgetAssignmentResource = new EmployeeBudgetAssignmentResource(employeeBudgetAssignmentRepository);
        this.restEmployeeBudgetAssignmentMockMvc = MockMvcBuilders.standaloneSetup(employeeBudgetAssignmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeBudgetAssignment createEntity(EntityManager em) {
        EmployeeBudgetAssignment employeeBudgetAssignment = new EmployeeBudgetAssignment()
            .usage(DEFAULT_USAGE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return employeeBudgetAssignment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeBudgetAssignment createUpdatedEntity(EntityManager em) {
        EmployeeBudgetAssignment employeeBudgetAssignment = new EmployeeBudgetAssignment()
            .usage(UPDATED_USAGE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return employeeBudgetAssignment;
    }

    @BeforeEach
    public void initTest() {
        employeeBudgetAssignment = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeeBudgetAssignment() throws Exception {
        int databaseSizeBeforeCreate = employeeBudgetAssignmentRepository.findAll().size();

        // Create the EmployeeBudgetAssignment
        restEmployeeBudgetAssignmentMockMvc.perform(post("/api/employee-budget-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeBudgetAssignment)))
            .andExpect(status().isCreated());

        // Validate the EmployeeBudgetAssignment in the database
        List<EmployeeBudgetAssignment> employeeBudgetAssignmentList = employeeBudgetAssignmentRepository.findAll();
        assertThat(employeeBudgetAssignmentList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeBudgetAssignment testEmployeeBudgetAssignment = employeeBudgetAssignmentList.get(employeeBudgetAssignmentList.size() - 1);
        assertThat(testEmployeeBudgetAssignment.getUsage()).isEqualTo(DEFAULT_USAGE);
        assertThat(testEmployeeBudgetAssignment.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testEmployeeBudgetAssignment.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createEmployeeBudgetAssignmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeeBudgetAssignmentRepository.findAll().size();

        // Create the EmployeeBudgetAssignment with an existing ID
        employeeBudgetAssignment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeBudgetAssignmentMockMvc.perform(post("/api/employee-budget-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeBudgetAssignment)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeBudgetAssignment in the database
        List<EmployeeBudgetAssignment> employeeBudgetAssignmentList = employeeBudgetAssignmentRepository.findAll();
        assertThat(employeeBudgetAssignmentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUsageIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeBudgetAssignmentRepository.findAll().size();
        // set the field null
        employeeBudgetAssignment.setUsage(null);

        // Create the EmployeeBudgetAssignment, which fails.

        restEmployeeBudgetAssignmentMockMvc.perform(post("/api/employee-budget-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeBudgetAssignment)))
            .andExpect(status().isBadRequest());

        List<EmployeeBudgetAssignment> employeeBudgetAssignmentList = employeeBudgetAssignmentRepository.findAll();
        assertThat(employeeBudgetAssignmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeBudgetAssignmentRepository.findAll().size();
        // set the field null
        employeeBudgetAssignment.setStartDate(null);

        // Create the EmployeeBudgetAssignment, which fails.

        restEmployeeBudgetAssignmentMockMvc.perform(post("/api/employee-budget-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeBudgetAssignment)))
            .andExpect(status().isBadRequest());

        List<EmployeeBudgetAssignment> employeeBudgetAssignmentList = employeeBudgetAssignmentRepository.findAll();
        assertThat(employeeBudgetAssignmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmployeeBudgetAssignments() throws Exception {
        // Initialize the database
        employeeBudgetAssignmentRepository.saveAndFlush(employeeBudgetAssignment);

        // Get all the employeeBudgetAssignmentList
        restEmployeeBudgetAssignmentMockMvc.perform(get("/api/employee-budget-assignments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeBudgetAssignment.getId().intValue())))
            .andExpect(jsonPath("$.[*].usage").value(hasItem(DEFAULT_USAGE)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getEmployeeBudgetAssignment() throws Exception {
        // Initialize the database
        employeeBudgetAssignmentRepository.saveAndFlush(employeeBudgetAssignment);

        // Get the employeeBudgetAssignment
        restEmployeeBudgetAssignmentMockMvc.perform(get("/api/employee-budget-assignments/{id}", employeeBudgetAssignment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeeBudgetAssignment.getId().intValue()))
            .andExpect(jsonPath("$.usage").value(DEFAULT_USAGE))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeeBudgetAssignment() throws Exception {
        // Get the employeeBudgetAssignment
        restEmployeeBudgetAssignmentMockMvc.perform(get("/api/employee-budget-assignments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeeBudgetAssignment() throws Exception {
        // Initialize the database
        employeeBudgetAssignmentRepository.saveAndFlush(employeeBudgetAssignment);

        int databaseSizeBeforeUpdate = employeeBudgetAssignmentRepository.findAll().size();

        // Update the employeeBudgetAssignment
        EmployeeBudgetAssignment updatedEmployeeBudgetAssignment = employeeBudgetAssignmentRepository.findById(employeeBudgetAssignment.getId()).get();
        // Disconnect from session so that the updates on updatedEmployeeBudgetAssignment are not directly saved in db
        em.detach(updatedEmployeeBudgetAssignment);
        updatedEmployeeBudgetAssignment
            .usage(UPDATED_USAGE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restEmployeeBudgetAssignmentMockMvc.perform(put("/api/employee-budget-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmployeeBudgetAssignment)))
            .andExpect(status().isOk());

        // Validate the EmployeeBudgetAssignment in the database
        List<EmployeeBudgetAssignment> employeeBudgetAssignmentList = employeeBudgetAssignmentRepository.findAll();
        assertThat(employeeBudgetAssignmentList).hasSize(databaseSizeBeforeUpdate);
        EmployeeBudgetAssignment testEmployeeBudgetAssignment = employeeBudgetAssignmentList.get(employeeBudgetAssignmentList.size() - 1);
        assertThat(testEmployeeBudgetAssignment.getUsage()).isEqualTo(UPDATED_USAGE);
        assertThat(testEmployeeBudgetAssignment.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testEmployeeBudgetAssignment.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeeBudgetAssignment() throws Exception {
        int databaseSizeBeforeUpdate = employeeBudgetAssignmentRepository.findAll().size();

        // Create the EmployeeBudgetAssignment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeBudgetAssignmentMockMvc.perform(put("/api/employee-budget-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeBudgetAssignment)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeBudgetAssignment in the database
        List<EmployeeBudgetAssignment> employeeBudgetAssignmentList = employeeBudgetAssignmentRepository.findAll();
        assertThat(employeeBudgetAssignmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmployeeBudgetAssignment() throws Exception {
        // Initialize the database
        employeeBudgetAssignmentRepository.saveAndFlush(employeeBudgetAssignment);

        int databaseSizeBeforeDelete = employeeBudgetAssignmentRepository.findAll().size();

        // Delete the employeeBudgetAssignment
        restEmployeeBudgetAssignmentMockMvc.perform(delete("/api/employee-budget-assignments/{id}", employeeBudgetAssignment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<EmployeeBudgetAssignment> employeeBudgetAssignmentList = employeeBudgetAssignmentRepository.findAll();
        assertThat(employeeBudgetAssignmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeBudgetAssignment.class);
        EmployeeBudgetAssignment employeeBudgetAssignment1 = new EmployeeBudgetAssignment();
        employeeBudgetAssignment1.setId(1L);
        EmployeeBudgetAssignment employeeBudgetAssignment2 = new EmployeeBudgetAssignment();
        employeeBudgetAssignment2.setId(employeeBudgetAssignment1.getId());
        assertThat(employeeBudgetAssignment1).isEqualTo(employeeBudgetAssignment2);
        employeeBudgetAssignment2.setId(2L);
        assertThat(employeeBudgetAssignment1).isNotEqualTo(employeeBudgetAssignment2);
        employeeBudgetAssignment1.setId(null);
        assertThat(employeeBudgetAssignment1).isNotEqualTo(employeeBudgetAssignment2);
    }
}
