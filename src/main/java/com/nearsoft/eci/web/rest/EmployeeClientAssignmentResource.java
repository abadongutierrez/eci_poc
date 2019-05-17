package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.domain.EmployeeClientAssignment;
import com.nearsoft.eci.repository.EmployeeClientAssignmentRepository;
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
 * REST controller for managing {@link com.nearsoft.eci.domain.EmployeeClientAssignment}.
 */
@RestController
@RequestMapping("/api")
public class EmployeeClientAssignmentResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeClientAssignmentResource.class);

    private static final String ENTITY_NAME = "employeeClientAssignment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeClientAssignmentRepository employeeClientAssignmentRepository;

    public EmployeeClientAssignmentResource(EmployeeClientAssignmentRepository employeeClientAssignmentRepository) {
        this.employeeClientAssignmentRepository = employeeClientAssignmentRepository;
    }

    /**
     * {@code POST  /employee-client-assignments} : Create a new employeeClientAssignment.
     *
     * @param employeeClientAssignment the employeeClientAssignment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employeeClientAssignment, or with status {@code 400 (Bad Request)} if the employeeClientAssignment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employee-client-assignments")
    public ResponseEntity<EmployeeClientAssignment> createEmployeeClientAssignment(@Valid @RequestBody EmployeeClientAssignment employeeClientAssignment) throws URISyntaxException {
        log.debug("REST request to save EmployeeClientAssignment : {}", employeeClientAssignment);
        if (employeeClientAssignment.getId() != null) {
            throw new BadRequestAlertException("A new employeeClientAssignment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeeClientAssignment result = employeeClientAssignmentRepository.save(employeeClientAssignment);
        return ResponseEntity.created(new URI("/api/employee-client-assignments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employee-client-assignments} : Updates an existing employeeClientAssignment.
     *
     * @param employeeClientAssignment the employeeClientAssignment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeClientAssignment,
     * or with status {@code 400 (Bad Request)} if the employeeClientAssignment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeClientAssignment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employee-client-assignments")
    public ResponseEntity<EmployeeClientAssignment> updateEmployeeClientAssignment(@Valid @RequestBody EmployeeClientAssignment employeeClientAssignment) throws URISyntaxException {
        log.debug("REST request to update EmployeeClientAssignment : {}", employeeClientAssignment);
        if (employeeClientAssignment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmployeeClientAssignment result = employeeClientAssignmentRepository.save(employeeClientAssignment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeeClientAssignment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employee-client-assignments} : get all the employeeClientAssignments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employeeClientAssignments in body.
     */
    @GetMapping("/employee-client-assignments")
    public List<EmployeeClientAssignment> getAllEmployeeClientAssignments() {
        log.debug("REST request to get all EmployeeClientAssignments");
        return employeeClientAssignmentRepository.findAll();
    }

    /**
     * {@code GET  /employee-client-assignments/:id} : get the "id" employeeClientAssignment.
     *
     * @param id the id of the employeeClientAssignment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeClientAssignment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employee-client-assignments/{id}")
    public ResponseEntity<EmployeeClientAssignment> getEmployeeClientAssignment(@PathVariable Long id) {
        log.debug("REST request to get EmployeeClientAssignment : {}", id);
        Optional<EmployeeClientAssignment> employeeClientAssignment = employeeClientAssignmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employeeClientAssignment);
    }

    /**
     * {@code DELETE  /employee-client-assignments/:id} : delete the "id" employeeClientAssignment.
     *
     * @param id the id of the employeeClientAssignment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employee-client-assignments/{id}")
    public ResponseEntity<Void> deleteEmployeeClientAssignment(@PathVariable Long id) {
        log.debug("REST request to delete EmployeeClientAssignment : {}", id);
        employeeClientAssignmentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
