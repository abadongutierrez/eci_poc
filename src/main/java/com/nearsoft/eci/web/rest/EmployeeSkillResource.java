package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.domain.EmployeeSkill;
import com.nearsoft.eci.repository.EmployeeSkillRepository;
import com.nearsoft.eci.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.nearsoft.eci.domain.EmployeeSkill}.
 */
@RestController
@RequestMapping("/api")
public class EmployeeSkillResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeSkillResource.class);

    private static final String ENTITY_NAME = "employeeSkill";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeSkillRepository employeeSkillRepository;

    public EmployeeSkillResource(EmployeeSkillRepository employeeSkillRepository) {
        this.employeeSkillRepository = employeeSkillRepository;
    }

    /**
     * {@code POST  /employee-skills} : Create a new employeeSkill.
     *
     * @param employeeSkill the employeeSkill to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employeeSkill, or with status {@code 400 (Bad Request)} if the employeeSkill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employee-skills")
    public ResponseEntity<EmployeeSkill> createEmployeeSkill(@RequestBody EmployeeSkill employeeSkill) throws URISyntaxException {
        log.debug("REST request to save EmployeeSkill : {}", employeeSkill);
        if (employeeSkill.getId() != null) {
            throw new BadRequestAlertException("A new employeeSkill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeeSkill result = employeeSkillRepository.save(employeeSkill);
        return ResponseEntity.created(new URI("/api/employee-skills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employee-skills} : Updates an existing employeeSkill.
     *
     * @param employeeSkill the employeeSkill to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeSkill,
     * or with status {@code 400 (Bad Request)} if the employeeSkill is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeSkill couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employee-skills")
    public ResponseEntity<EmployeeSkill> updateEmployeeSkill(@RequestBody EmployeeSkill employeeSkill) throws URISyntaxException {
        log.debug("REST request to update EmployeeSkill : {}", employeeSkill);
        if (employeeSkill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmployeeSkill result = employeeSkillRepository.save(employeeSkill);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeeSkill.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employee-skills} : get all the employeeSkills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employeeSkills in body.
     */
    @GetMapping("/employee-skills")
    public List<EmployeeSkill> getAllEmployeeSkills() {
        log.debug("REST request to get all EmployeeSkills");
        return employeeSkillRepository.findAll();
    }

    /**
     * {@code GET  /employee-skills/:id} : get the "id" employeeSkill.
     *
     * @param id the id of the employeeSkill to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeSkill, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employee-skills/{id}")
    public ResponseEntity<EmployeeSkill> getEmployeeSkill(@PathVariable Long id) {
        log.debug("REST request to get EmployeeSkill : {}", id);
        Optional<EmployeeSkill> employeeSkill = employeeSkillRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employeeSkill);
    }

    /**
     * {@code DELETE  /employee-skills/:id} : delete the "id" employeeSkill.
     *
     * @param id the id of the employeeSkill to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employee-skills/{id}")
    public ResponseEntity<Void> deleteEmployeeSkill(@PathVariable Long id) {
        log.debug("REST request to delete EmployeeSkill : {}", id);
        employeeSkillRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
