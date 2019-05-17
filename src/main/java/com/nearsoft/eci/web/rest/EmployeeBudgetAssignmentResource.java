package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.domain.EmployeeBudgetAssignment;
import com.nearsoft.eci.repository.EmployeeBudgetAssignmentRepository;
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
 * REST controller for managing {@link com.nearsoft.eci.domain.EmployeeBudgetAssignment}.
 */
@RestController
@RequestMapping("/api")
public class EmployeeBudgetAssignmentResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeBudgetAssignmentResource.class);

    private static final String ENTITY_NAME = "employeeBudgetAssignment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeBudgetAssignmentRepository employeeBudgetAssignmentRepository;

    public EmployeeBudgetAssignmentResource(EmployeeBudgetAssignmentRepository employeeBudgetAssignmentRepository) {
        this.employeeBudgetAssignmentRepository = employeeBudgetAssignmentRepository;
    }

    /**
     * {@code POST  /employee-budget-assignments} : Create a new employeeBudgetAssignment.
     *
     * @param employeeBudgetAssignment the employeeBudgetAssignment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employeeBudgetAssignment, or with status {@code 400 (Bad Request)} if the employeeBudgetAssignment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employee-budget-assignments")
    public ResponseEntity<EmployeeBudgetAssignment> createEmployeeBudgetAssignment(@Valid @RequestBody EmployeeBudgetAssignment employeeBudgetAssignment) throws URISyntaxException {
        log.debug("REST request to save EmployeeBudgetAssignment : {}", employeeBudgetAssignment);
        if (employeeBudgetAssignment.getId() != null) {
            throw new BadRequestAlertException("A new employeeBudgetAssignment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeeBudgetAssignment result = employeeBudgetAssignmentRepository.save(employeeBudgetAssignment);
        return ResponseEntity.created(new URI("/api/employee-budget-assignments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employee-budget-assignments} : Updates an existing employeeBudgetAssignment.
     *
     * @param employeeBudgetAssignment the employeeBudgetAssignment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeBudgetAssignment,
     * or with status {@code 400 (Bad Request)} if the employeeBudgetAssignment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeBudgetAssignment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employee-budget-assignments")
    public ResponseEntity<EmployeeBudgetAssignment> updateEmployeeBudgetAssignment(@Valid @RequestBody EmployeeBudgetAssignment employeeBudgetAssignment) throws URISyntaxException {
        log.debug("REST request to update EmployeeBudgetAssignment : {}", employeeBudgetAssignment);
        if (employeeBudgetAssignment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmployeeBudgetAssignment result = employeeBudgetAssignmentRepository.save(employeeBudgetAssignment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeeBudgetAssignment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employee-budget-assignments} : get all the employeeBudgetAssignments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employeeBudgetAssignments in body.
     */
    @GetMapping("/employee-budget-assignments")
    public List<EmployeeBudgetAssignment> getAllEmployeeBudgetAssignments() {
        log.debug("REST request to get all EmployeeBudgetAssignments");
        return employeeBudgetAssignmentRepository.findAll();
    }

    /**
     * {@code GET  /employee-budget-assignments/:id} : get the "id" employeeBudgetAssignment.
     *
     * @param id the id of the employeeBudgetAssignment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeBudgetAssignment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employee-budget-assignments/{id}")
    public ResponseEntity<EmployeeBudgetAssignment> getEmployeeBudgetAssignment(@PathVariable Long id) {
        log.debug("REST request to get EmployeeBudgetAssignment : {}", id);
        Optional<EmployeeBudgetAssignment> employeeBudgetAssignment = employeeBudgetAssignmentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employeeBudgetAssignment);
    }

    /**
     * {@code DELETE  /employee-budget-assignments/:id} : delete the "id" employeeBudgetAssignment.
     *
     * @param id the id of the employeeBudgetAssignment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employee-budget-assignments/{id}")
    public ResponseEntity<Void> deleteEmployeeBudgetAssignment(@PathVariable Long id) {
        log.debug("REST request to delete EmployeeBudgetAssignment : {}", id);
        employeeBudgetAssignmentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
