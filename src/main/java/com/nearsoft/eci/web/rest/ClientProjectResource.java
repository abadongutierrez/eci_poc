package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.domain.ClientProject;
import com.nearsoft.eci.repository.ClientProjectRepository;
import com.nearsoft.eci.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.nearsoft.eci.domain.ClientProject}.
 */
@RestController
@RequestMapping("/api")
public class ClientProjectResource {

    private final Logger log = LoggerFactory.getLogger(ClientProjectResource.class);

    private static final String ENTITY_NAME = "clientProject";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClientProjectRepository clientProjectRepository;

    public ClientProjectResource(ClientProjectRepository clientProjectRepository) {
        this.clientProjectRepository = clientProjectRepository;
    }

    /**
     * {@code POST  /client-projects} : Create a new clientProject.
     *
     * @param clientProject the clientProject to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clientProject, or with status {@code 400 (Bad Request)} if the clientProject has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/client-projects")
    public ResponseEntity<ClientProject> createClientProject(@Valid @RequestBody ClientProject clientProject) throws URISyntaxException {
        log.debug("REST request to save ClientProject : {}", clientProject);
        if (clientProject.getId() != null) {
            throw new BadRequestAlertException("A new clientProject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientProject result = clientProjectRepository.save(clientProject);
        return ResponseEntity.created(new URI("/api/client-projects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /client-projects} : Updates an existing clientProject.
     *
     * @param clientProject the clientProject to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clientProject,
     * or with status {@code 400 (Bad Request)} if the clientProject is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clientProject couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/client-projects")
    public ResponseEntity<ClientProject> updateClientProject(@Valid @RequestBody ClientProject clientProject) throws URISyntaxException {
        log.debug("REST request to update ClientProject : {}", clientProject);
        if (clientProject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClientProject result = clientProjectRepository.save(clientProject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clientProject.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /client-projects} : get all the clientProjects.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clientProjects in body.
     */
    @GetMapping("/client-projects")
    public List<ClientProject> getAllClientProjects() {
        log.debug("REST request to get all ClientProjects");
        return clientProjectRepository.findAll();
    }

    /**
     * {@code GET  /client-projects/:id} : get the "id" clientProject.
     *
     * @param id the id of the clientProject to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clientProject, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/client-projects/{id}")
    public ResponseEntity<ClientProject> getClientProject(@PathVariable Long id) {
        log.debug("REST request to get ClientProject : {}", id);
        Optional<ClientProject> clientProject = clientProjectRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clientProject);
    }

    /**
     * {@code DELETE  /client-projects/:id} : delete the "id" clientProject.
     *
     * @param id the id of the clientProject to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/client-projects/{id}")
    public ResponseEntity<Void> deleteClientProject(@PathVariable Long id) {
        log.debug("REST request to delete ClientProject : {}", id);
        clientProjectRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
