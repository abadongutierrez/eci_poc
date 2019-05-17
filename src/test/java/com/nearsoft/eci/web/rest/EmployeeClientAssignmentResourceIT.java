package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.EciApp;
import com.nearsoft.eci.domain.EmployeeClientAssignment;
import com.nearsoft.eci.repository.EmployeeClientAssignmentRepository;
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
 * Integration tests for the {@Link EmployeeClientAssignmentResource} REST controller.
 */
@SpringBootTest(classes = EciApp.class)
public class EmployeeClientAssignmentResourceIT {

    private static final Integer DEFAULT_USAGE = 0;
    private static final Integer UPDATED_USAGE = 1;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private EmployeeClientAssignmentRepository employeeClientAssignmentRepository;

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

    private MockMvc restEmployeeClientAssignmentMockMvc;

    private EmployeeClientAssignment employeeClientAssignment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmployeeClientAssignmentResource employeeClientAssignmentResource = new EmployeeClientAssignmentResource(employeeClientAssignmentRepository);
        this.restEmployeeClientAssignmentMockMvc = MockMvcBuilders.standaloneSetup(employeeClientAssignmentResource)
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
    public static EmployeeClientAssignment createEntity(EntityManager em) {
        EmployeeClientAssignment employeeClientAssignment = new EmployeeClientAssignment()
            .usage(DEFAULT_USAGE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return employeeClientAssignment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeClientAssignment createUpdatedEntity(EntityManager em) {
        EmployeeClientAssignment employeeClientAssignment = new EmployeeClientAssignment()
            .usage(UPDATED_USAGE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return employeeClientAssignment;
    }

    @BeforeEach
    public void initTest() {
        employeeClientAssignment = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeeClientAssignment() throws Exception {
        int databaseSizeBeforeCreate = employeeClientAssignmentRepository.findAll().size();

        // Create the EmployeeClientAssignment
        restEmployeeClientAssignmentMockMvc.perform(post("/api/employee-client-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeClientAssignment)))
            .andExpect(status().isCreated());

        // Validate the EmployeeClientAssignment in the database
        List<EmployeeClientAssignment> employeeClientAssignmentList = employeeClientAssignmentRepository.findAll();
        assertThat(employeeClientAssignmentList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeClientAssignment testEmployeeClientAssignment = employeeClientAssignmentList.get(employeeClientAssignmentList.size() - 1);
        assertThat(testEmployeeClientAssignment.getUsage()).isEqualTo(DEFAULT_USAGE);
        assertThat(testEmployeeClientAssignment.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testEmployeeClientAssignment.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createEmployeeClientAssignmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeeClientAssignmentRepository.findAll().size();

        // Create the EmployeeClientAssignment with an existing ID
        employeeClientAssignment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeClientAssignmentMockMvc.perform(post("/api/employee-client-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeClientAssignment)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeClientAssignment in the database
        List<EmployeeClientAssignment> employeeClientAssignmentList = employeeClientAssignmentRepository.findAll();
        assertThat(employeeClientAssignmentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUsageIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeClientAssignmentRepository.findAll().size();
        // set the field null
        employeeClientAssignment.setUsage(null);

        // Create the EmployeeClientAssignment, which fails.

        restEmployeeClientAssignmentMockMvc.perform(post("/api/employee-client-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeClientAssignment)))
            .andExpect(status().isBadRequest());

        List<EmployeeClientAssignment> employeeClientAssignmentList = employeeClientAssignmentRepository.findAll();
        assertThat(employeeClientAssignmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = employeeClientAssignmentRepository.findAll().size();
        // set the field null
        employeeClientAssignment.setStartDate(null);

        // Create the EmployeeClientAssignment, which fails.

        restEmployeeClientAssignmentMockMvc.perform(post("/api/employee-client-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeClientAssignment)))
            .andExpect(status().isBadRequest());

        List<EmployeeClientAssignment> employeeClientAssignmentList = employeeClientAssignmentRepository.findAll();
        assertThat(employeeClientAssignmentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmployeeClientAssignments() throws Exception {
        // Initialize the database
        employeeClientAssignmentRepository.saveAndFlush(employeeClientAssignment);

        // Get all the employeeClientAssignmentList
        restEmployeeClientAssignmentMockMvc.perform(get("/api/employee-client-assignments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeClientAssignment.getId().intValue())))
            .andExpect(jsonPath("$.[*].usage").value(hasItem(DEFAULT_USAGE)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getEmployeeClientAssignment() throws Exception {
        // Initialize the database
        employeeClientAssignmentRepository.saveAndFlush(employeeClientAssignment);

        // Get the employeeClientAssignment
        restEmployeeClientAssignmentMockMvc.perform(get("/api/employee-client-assignments/{id}", employeeClientAssignment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(employeeClientAssignment.getId().intValue()))
            .andExpect(jsonPath("$.usage").value(DEFAULT_USAGE))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeeClientAssignment() throws Exception {
        // Get the employeeClientAssignment
        restEmployeeClientAssignmentMockMvc.perform(get("/api/employee-client-assignments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeeClientAssignment() throws Exception {
        // Initialize the database
        employeeClientAssignmentRepository.saveAndFlush(employeeClientAssignment);

        int databaseSizeBeforeUpdate = employeeClientAssignmentRepository.findAll().size();

        // Update the employeeClientAssignment
        EmployeeClientAssignment updatedEmployeeClientAssignment = employeeClientAssignmentRepository.findById(employeeClientAssignment.getId()).get();
        // Disconnect from session so that the updates on updatedEmployeeClientAssignment are not directly saved in db
        em.detach(updatedEmployeeClientAssignment);
        updatedEmployeeClientAssignment
            .usage(UPDATED_USAGE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restEmployeeClientAssignmentMockMvc.perform(put("/api/employee-client-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmployeeClientAssignment)))
            .andExpect(status().isOk());

        // Validate the EmployeeClientAssignment in the database
        List<EmployeeClientAssignment> employeeClientAssignmentList = employeeClientAssignmentRepository.findAll();
        assertThat(employeeClientAssignmentList).hasSize(databaseSizeBeforeUpdate);
        EmployeeClientAssignment testEmployeeClientAssignment = employeeClientAssignmentList.get(employeeClientAssignmentList.size() - 1);
        assertThat(testEmployeeClientAssignment.getUsage()).isEqualTo(UPDATED_USAGE);
        assertThat(testEmployeeClientAssignment.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testEmployeeClientAssignment.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeeClientAssignment() throws Exception {
        int databaseSizeBeforeUpdate = employeeClientAssignmentRepository.findAll().size();

        // Create the EmployeeClientAssignment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeClientAssignmentMockMvc.perform(put("/api/employee-client-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(employeeClientAssignment)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeClientAssignment in the database
        List<EmployeeClientAssignment> employeeClientAssignmentList = employeeClientAssignmentRepository.findAll();
        assertThat(employeeClientAssignmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmployeeClientAssignment() throws Exception {
        // Initialize the database
        employeeClientAssignmentRepository.saveAndFlush(employeeClientAssignment);

        int databaseSizeBeforeDelete = employeeClientAssignmentRepository.findAll().size();

        // Delete the employeeClientAssignment
        restEmployeeClientAssignmentMockMvc.perform(delete("/api/employee-client-assignments/{id}", employeeClientAssignment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<EmployeeClientAssignment> employeeClientAssignmentList = employeeClientAssignmentRepository.findAll();
        assertThat(employeeClientAssignmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmployeeClientAssignment.class);
        EmployeeClientAssignment employeeClientAssignment1 = new EmployeeClientAssignment();
        employeeClientAssignment1.setId(1L);
        EmployeeClientAssignment employeeClientAssignment2 = new EmployeeClientAssignment();
        employeeClientAssignment2.setId(employeeClientAssignment1.getId());
        assertThat(employeeClientAssignment1).isEqualTo(employeeClientAssignment2);
        employeeClientAssignment2.setId(2L);
        assertThat(employeeClientAssignment1).isNotEqualTo(employeeClientAssignment2);
        employeeClientAssignment1.setId(null);
        assertThat(employeeClientAssignment1).isNotEqualTo(employeeClientAssignment2);
    }
}
