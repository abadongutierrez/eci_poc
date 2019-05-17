package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.domain.NextOfKin;
import com.nearsoft.eci.repository.NextOfKinRepository;
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
 * REST controller for managing {@link com.nearsoft.eci.domain.NextOfKin}.
 */
@RestController
@RequestMapping("/api")
public class NextOfKinResource {

    private final Logger log = LoggerFactory.getLogger(NextOfKinResource.class);

    private static final String ENTITY_NAME = "nextOfKin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NextOfKinRepository nextOfKinRepository;

    public NextOfKinResource(NextOfKinRepository nextOfKinRepository) {
        this.nextOfKinRepository = nextOfKinRepository;
    }

    /**
     * {@code POST  /next-of-kins} : Create a new nextOfKin.
     *
     * @param nextOfKin the nextOfKin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nextOfKin, or with status {@code 400 (Bad Request)} if the nextOfKin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/next-of-kins")
    public ResponseEntity<NextOfKin> createNextOfKin(@Valid @RequestBody NextOfKin nextOfKin) throws URISyntaxException {
        log.debug("REST request to save NextOfKin : {}", nextOfKin);
        if (nextOfKin.getId() != null) {
            throw new BadRequestAlertException("A new nextOfKin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NextOfKin result = nextOfKinRepository.save(nextOfKin);
        return ResponseEntity.created(new URI("/api/next-of-kins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /next-of-kins} : Updates an existing nextOfKin.
     *
     * @param nextOfKin the nextOfKin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nextOfKin,
     * or with status {@code 400 (Bad Request)} if the nextOfKin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nextOfKin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/next-of-kins")
    public ResponseEntity<NextOfKin> updateNextOfKin(@Valid @RequestBody NextOfKin nextOfKin) throws URISyntaxException {
        log.debug("REST request to update NextOfKin : {}", nextOfKin);
        if (nextOfKin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NextOfKin result = nextOfKinRepository.save(nextOfKin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nextOfKin.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /next-of-kins} : get all the nextOfKins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nextOfKins in body.
     */
    @GetMapping("/next-of-kins")
    public List<NextOfKin> getAllNextOfKins() {
        log.debug("REST request to get all NextOfKins");
        return nextOfKinRepository.findAll();
    }

    /**
     * {@code GET  /next-of-kins/:id} : get the "id" nextOfKin.
     *
     * @param id the id of the nextOfKin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nextOfKin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/next-of-kins/{id}")
    public ResponseEntity<NextOfKin> getNextOfKin(@PathVariable Long id) {
        log.debug("REST request to get NextOfKin : {}", id);
        Optional<NextOfKin> nextOfKin = nextOfKinRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nextOfKin);
    }

    /**
     * {@code DELETE  /next-of-kins/:id} : delete the "id" nextOfKin.
     *
     * @param id the id of the nextOfKin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/next-of-kins/{id}")
    public ResponseEntity<Void> deleteNextOfKin(@PathVariable Long id) {
        log.debug("REST request to delete NextOfKin : {}", id);
        nextOfKinRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
