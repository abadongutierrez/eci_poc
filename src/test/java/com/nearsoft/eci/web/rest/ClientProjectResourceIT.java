package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.EciApp;
import com.nearsoft.eci.domain.ClientProject;
import com.nearsoft.eci.repository.ClientProjectRepository;
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

/**
 * Integration tests for the {@Link ClientProjectResource} REST controller.
 */
@SpringBootTest(classes = EciApp.class)
public class ClientProjectResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ClientProjectRepository clientProjectRepository;

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

    private MockMvc restClientProjectMockMvc;

    private ClientProject clientProject;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClientProjectResource clientProjectResource = new ClientProjectResource(clientProjectRepository);
        this.restClientProjectMockMvc = MockMvcBuilders.standaloneSetup(clientProjectResource)
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
    public static ClientProject createEntity(EntityManager em) {
        ClientProject clientProject = new ClientProject()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return clientProject;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClientProject createUpdatedEntity(EntityManager em) {
        ClientProject clientProject = new ClientProject()
            .name(UPDATED_NAME)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);
        return clientProject;
    }

    @BeforeEach
    public void initTest() {
        clientProject = createEntity(em);
    }

    @Test
    @Transactional
    public void createClientProject() throws Exception {
        int databaseSizeBeforeCreate = clientProjectRepository.findAll().size();

        // Create the ClientProject
        restClientProjectMockMvc.perform(post("/api/client-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientProject)))
            .andExpect(status().isCreated());

        // Validate the ClientProject in the database
        List<ClientProject> clientProjectList = clientProjectRepository.findAll();
        assertThat(clientProjectList).hasSize(databaseSizeBeforeCreate + 1);
        ClientProject testClientProject = clientProjectList.get(clientProjectList.size() - 1);
        assertThat(testClientProject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testClientProject.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testClientProject.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createClientProjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientProjectRepository.findAll().size();

        // Create the ClientProject with an existing ID
        clientProject.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientProjectMockMvc.perform(post("/api/client-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientProject)))
            .andExpect(status().isBadRequest());

        // Validate the ClientProject in the database
        List<ClientProject> clientProjectList = clientProjectRepository.findAll();
        assertThat(clientProjectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientProjectRepository.findAll().size();
        // set the field null
        clientProject.setName(null);

        // Create the ClientProject, which fails.

        restClientProjectMockMvc.perform(post("/api/client-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientProject)))
            .andExpect(status().isBadRequest());

        List<ClientProject> clientProjectList = clientProjectRepository.findAll();
        assertThat(clientProjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientProjectRepository.findAll().size();
        // set the field null
        clientProject.setCode(null);

        // Create the ClientProject, which fails.

        restClientProjectMockMvc.perform(post("/api/client-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientProject)))
            .andExpect(status().isBadRequest());

        List<ClientProject> clientProjectList = clientProjectRepository.findAll();
        assertThat(clientProjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClientProjects() throws Exception {
        // Initialize the database
        clientProjectRepository.saveAndFlush(clientProject);

        // Get all the clientProjectList
        restClientProjectMockMvc.perform(get("/api/client-projects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientProject.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getClientProject() throws Exception {
        // Initialize the database
        clientProjectRepository.saveAndFlush(clientProject);

        // Get the clientProject
        restClientProjectMockMvc.perform(get("/api/client-projects/{id}", clientProject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clientProject.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClientProject() throws Exception {
        // Get the clientProject
        restClientProjectMockMvc.perform(get("/api/client-projects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClientProject() throws Exception {
        // Initialize the database
        clientProjectRepository.saveAndFlush(clientProject);

        int databaseSizeBeforeUpdate = clientProjectRepository.findAll().size();

        // Update the clientProject
        ClientProject updatedClientProject = clientProjectRepository.findById(clientProject.getId()).get();
        // Disconnect from session so that the updates on updatedClientProject are not directly saved in db
        em.detach(updatedClientProject);
        updatedClientProject
            .name(UPDATED_NAME)
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);

        restClientProjectMockMvc.perform(put("/api/client-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClientProject)))
            .andExpect(status().isOk());

        // Validate the ClientProject in the database
        List<ClientProject> clientProjectList = clientProjectRepository.findAll();
        assertThat(clientProjectList).hasSize(databaseSizeBeforeUpdate);
        ClientProject testClientProject = clientProjectList.get(clientProjectList.size() - 1);
        assertThat(testClientProject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testClientProject.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testClientProject.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingClientProject() throws Exception {
        int databaseSizeBeforeUpdate = clientProjectRepository.findAll().size();

        // Create the ClientProject

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClientProjectMockMvc.perform(put("/api/client-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientProject)))
            .andExpect(status().isBadRequest());

        // Validate the ClientProject in the database
        List<ClientProject> clientProjectList = clientProjectRepository.findAll();
        assertThat(clientProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClientProject() throws Exception {
        // Initialize the database
        clientProjectRepository.saveAndFlush(clientProject);

        int databaseSizeBeforeDelete = clientProjectRepository.findAll().size();

        // Delete the clientProject
        restClientProjectMockMvc.perform(delete("/api/client-projects/{id}", clientProject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<ClientProject> clientProjectList = clientProjectRepository.findAll();
        assertThat(clientProjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientProject.class);
        ClientProject clientProject1 = new ClientProject();
        clientProject1.setId(1L);
        ClientProject clientProject2 = new ClientProject();
        clientProject2.setId(clientProject1.getId());
        assertThat(clientProject1).isEqualTo(clientProject2);
        clientProject2.setId(2L);
        assertThat(clientProject1).isNotEqualTo(clientProject2);
        clientProject1.setId(null);
        assertThat(clientProject1).isNotEqualTo(clientProject2);
    }
}
