package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.EciApp;
import com.nearsoft.eci.domain.KeyDate;
import com.nearsoft.eci.repository.KeyDateRepository;
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

import com.nearsoft.eci.domain.enumeration.KeyDateType;
/**
 * Integration tests for the {@Link KeyDateResource} REST controller.
 */
@SpringBootTest(classes = EciApp.class)
public class KeyDateResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final KeyDateType DEFAULT_TYPE = KeyDateType.ACADEMY;
    private static final KeyDateType UPDATED_TYPE = KeyDateType.ACADEMY_PLUS;

    @Autowired
    private KeyDateRepository keyDateRepository;

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

    private MockMvc restKeyDateMockMvc;

    private KeyDate keyDate;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KeyDateResource keyDateResource = new KeyDateResource(keyDateRepository);
        this.restKeyDateMockMvc = MockMvcBuilders.standaloneSetup(keyDateResource)
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
    public static KeyDate createEntity(EntityManager em) {
        KeyDate keyDate = new KeyDate()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .type(DEFAULT_TYPE);
        return keyDate;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KeyDate createUpdatedEntity(EntityManager em) {
        KeyDate keyDate = new KeyDate()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .type(UPDATED_TYPE);
        return keyDate;
    }

    @BeforeEach
    public void initTest() {
        keyDate = createEntity(em);
    }

    @Test
    @Transactional
    public void createKeyDate() throws Exception {
        int databaseSizeBeforeCreate = keyDateRepository.findAll().size();

        // Create the KeyDate
        restKeyDateMockMvc.perform(post("/api/key-dates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyDate)))
            .andExpect(status().isCreated());

        // Validate the KeyDate in the database
        List<KeyDate> keyDateList = keyDateRepository.findAll();
        assertThat(keyDateList).hasSize(databaseSizeBeforeCreate + 1);
        KeyDate testKeyDate = keyDateList.get(keyDateList.size() - 1);
        assertThat(testKeyDate.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testKeyDate.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testKeyDate.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createKeyDateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keyDateRepository.findAll().size();

        // Create the KeyDate with an existing ID
        keyDate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeyDateMockMvc.perform(post("/api/key-dates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyDate)))
            .andExpect(status().isBadRequest());

        // Validate the KeyDate in the database
        List<KeyDate> keyDateList = keyDateRepository.findAll();
        assertThat(keyDateList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllKeyDates() throws Exception {
        // Initialize the database
        keyDateRepository.saveAndFlush(keyDate);

        // Get all the keyDateList
        restKeyDateMockMvc.perform(get("/api/key-dates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(keyDate.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getKeyDate() throws Exception {
        // Initialize the database
        keyDateRepository.saveAndFlush(keyDate);

        // Get the keyDate
        restKeyDateMockMvc.perform(get("/api/key-dates/{id}", keyDate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(keyDate.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKeyDate() throws Exception {
        // Get the keyDate
        restKeyDateMockMvc.perform(get("/api/key-dates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKeyDate() throws Exception {
        // Initialize the database
        keyDateRepository.saveAndFlush(keyDate);

        int databaseSizeBeforeUpdate = keyDateRepository.findAll().size();

        // Update the keyDate
        KeyDate updatedKeyDate = keyDateRepository.findById(keyDate.getId()).get();
        // Disconnect from session so that the updates on updatedKeyDate are not directly saved in db
        em.detach(updatedKeyDate);
        updatedKeyDate
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .type(UPDATED_TYPE);

        restKeyDateMockMvc.perform(put("/api/key-dates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKeyDate)))
            .andExpect(status().isOk());

        // Validate the KeyDate in the database
        List<KeyDate> keyDateList = keyDateRepository.findAll();
        assertThat(keyDateList).hasSize(databaseSizeBeforeUpdate);
        KeyDate testKeyDate = keyDateList.get(keyDateList.size() - 1);
        assertThat(testKeyDate.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testKeyDate.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testKeyDate.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingKeyDate() throws Exception {
        int databaseSizeBeforeUpdate = keyDateRepository.findAll().size();

        // Create the KeyDate

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKeyDateMockMvc.perform(put("/api/key-dates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyDate)))
            .andExpect(status().isBadRequest());

        // Validate the KeyDate in the database
        List<KeyDate> keyDateList = keyDateRepository.findAll();
        assertThat(keyDateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKeyDate() throws Exception {
        // Initialize the database
        keyDateRepository.saveAndFlush(keyDate);

        int databaseSizeBeforeDelete = keyDateRepository.findAll().size();

        // Delete the keyDate
        restKeyDateMockMvc.perform(delete("/api/key-dates/{id}", keyDate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<KeyDate> keyDateList = keyDateRepository.findAll();
        assertThat(keyDateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KeyDate.class);
        KeyDate keyDate1 = new KeyDate();
        keyDate1.setId(1L);
        KeyDate keyDate2 = new KeyDate();
        keyDate2.setId(keyDate1.getId());
        assertThat(keyDate1).isEqualTo(keyDate2);
        keyDate2.setId(2L);
        assertThat(keyDate1).isNotEqualTo(keyDate2);
        keyDate1.setId(null);
        assertThat(keyDate1).isNotEqualTo(keyDate2);
    }
}
