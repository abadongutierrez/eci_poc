package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.EciApp;
import com.nearsoft.eci.domain.NextOfKin;
import com.nearsoft.eci.repository.NextOfKinRepository;
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
import java.util.List;

import static com.nearsoft.eci.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.nearsoft.eci.domain.enumeration.KinshipType;
/**
 * Integration tests for the {@Link NextOfKinResource} REST controller.
 */
@SpringBootTest(classes = EciApp.class)
public class NextOfKinResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_HOME_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_HOME_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_NUMBER = "BBBBBBBBBB";

    private static final KinshipType DEFAULT_KINSHIP = KinshipType.SPOUSE;
    private static final KinshipType UPDATED_KINSHIP = KinshipType.FATHER;

    @Autowired
    private NextOfKinRepository nextOfKinRepository;

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

    private MockMvc restNextOfKinMockMvc;

    private NextOfKin nextOfKin;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NextOfKinResource nextOfKinResource = new NextOfKinResource(nextOfKinRepository);
        this.restNextOfKinMockMvc = MockMvcBuilders.standaloneSetup(nextOfKinResource)
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
    public static NextOfKin createEntity(EntityManager em) {
        NextOfKin nextOfKin = new NextOfKin()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .homeNumber(DEFAULT_HOME_NUMBER)
            .mobileNumber(DEFAULT_MOBILE_NUMBER)
            .kinship(DEFAULT_KINSHIP);
        return nextOfKin;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NextOfKin createUpdatedEntity(EntityManager em) {
        NextOfKin nextOfKin = new NextOfKin()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .homeNumber(UPDATED_HOME_NUMBER)
            .mobileNumber(UPDATED_MOBILE_NUMBER)
            .kinship(UPDATED_KINSHIP);
        return nextOfKin;
    }

    @BeforeEach
    public void initTest() {
        nextOfKin = createEntity(em);
    }

    @Test
    @Transactional
    public void createNextOfKin() throws Exception {
        int databaseSizeBeforeCreate = nextOfKinRepository.findAll().size();

        // Create the NextOfKin
        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isCreated());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeCreate + 1);
        NextOfKin testNextOfKin = nextOfKinList.get(nextOfKinList.size() - 1);
        assertThat(testNextOfKin.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testNextOfKin.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testNextOfKin.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testNextOfKin.getHomeNumber()).isEqualTo(DEFAULT_HOME_NUMBER);
        assertThat(testNextOfKin.getMobileNumber()).isEqualTo(DEFAULT_MOBILE_NUMBER);
        assertThat(testNextOfKin.getKinship()).isEqualTo(DEFAULT_KINSHIP);
    }

    @Test
    @Transactional
    public void createNextOfKinWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nextOfKinRepository.findAll().size();

        // Create the NextOfKin with an existing ID
        nextOfKin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isBadRequest());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = nextOfKinRepository.findAll().size();
        // set the field null
        nextOfKin.setFirstName(null);

        // Create the NextOfKin, which fails.

        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isBadRequest());

        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = nextOfKinRepository.findAll().size();
        // set the field null
        nextOfKin.setLastName(null);

        // Create the NextOfKin, which fails.

        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isBadRequest());

        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkKinshipIsRequired() throws Exception {
        int databaseSizeBeforeTest = nextOfKinRepository.findAll().size();
        // set the field null
        nextOfKin.setKinship(null);

        // Create the NextOfKin, which fails.

        restNextOfKinMockMvc.perform(post("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isBadRequest());

        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNextOfKins() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        // Get all the nextOfKinList
        restNextOfKinMockMvc.perform(get("/api/next-of-kins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nextOfKin.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].homeNumber").value(hasItem(DEFAULT_HOME_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].mobileNumber").value(hasItem(DEFAULT_MOBILE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].kinship").value(hasItem(DEFAULT_KINSHIP.toString())));
    }
    
    @Test
    @Transactional
    public void getNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        // Get the nextOfKin
        restNextOfKinMockMvc.perform(get("/api/next-of-kins/{id}", nextOfKin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nextOfKin.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.homeNumber").value(DEFAULT_HOME_NUMBER.toString()))
            .andExpect(jsonPath("$.mobileNumber").value(DEFAULT_MOBILE_NUMBER.toString()))
            .andExpect(jsonPath("$.kinship").value(DEFAULT_KINSHIP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNextOfKin() throws Exception {
        // Get the nextOfKin
        restNextOfKinMockMvc.perform(get("/api/next-of-kins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        int databaseSizeBeforeUpdate = nextOfKinRepository.findAll().size();

        // Update the nextOfKin
        NextOfKin updatedNextOfKin = nextOfKinRepository.findById(nextOfKin.getId()).get();
        // Disconnect from session so that the updates on updatedNextOfKin are not directly saved in db
        em.detach(updatedNextOfKin);
        updatedNextOfKin
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .homeNumber(UPDATED_HOME_NUMBER)
            .mobileNumber(UPDATED_MOBILE_NUMBER)
            .kinship(UPDATED_KINSHIP);

        restNextOfKinMockMvc.perform(put("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNextOfKin)))
            .andExpect(status().isOk());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeUpdate);
        NextOfKin testNextOfKin = nextOfKinList.get(nextOfKinList.size() - 1);
        assertThat(testNextOfKin.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testNextOfKin.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testNextOfKin.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testNextOfKin.getHomeNumber()).isEqualTo(UPDATED_HOME_NUMBER);
        assertThat(testNextOfKin.getMobileNumber()).isEqualTo(UPDATED_MOBILE_NUMBER);
        assertThat(testNextOfKin.getKinship()).isEqualTo(UPDATED_KINSHIP);
    }

    @Test
    @Transactional
    public void updateNonExistingNextOfKin() throws Exception {
        int databaseSizeBeforeUpdate = nextOfKinRepository.findAll().size();

        // Create the NextOfKin

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNextOfKinMockMvc.perform(put("/api/next-of-kins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKin)))
            .andExpect(status().isBadRequest());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        int databaseSizeBeforeDelete = nextOfKinRepository.findAll().size();

        // Delete the nextOfKin
        restNextOfKinMockMvc.perform(delete("/api/next-of-kins/{id}", nextOfKin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NextOfKin.class);
        NextOfKin nextOfKin1 = new NextOfKin();
        nextOfKin1.setId(1L);
        NextOfKin nextOfKin2 = new NextOfKin();
        nextOfKin2.setId(nextOfKin1.getId());
        assertThat(nextOfKin1).isEqualTo(nextOfKin2);
        nextOfKin2.setId(2L);
        assertThat(nextOfKin1).isNotEqualTo(nextOfKin2);
        nextOfKin1.setId(null);
        assertThat(nextOfKin1).isNotEqualTo(nextOfKin2);
    }
}
