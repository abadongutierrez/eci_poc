package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.domain.KeyDate;
import com.nearsoft.eci.repository.KeyDateRepository;
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
 * REST controller for managing {@link com.nearsoft.eci.domain.KeyDate}.
 */
@RestController
@RequestMapping("/api")
public class KeyDateResource {

    private final Logger log = LoggerFactory.getLogger(KeyDateResource.class);

    private static final String ENTITY_NAME = "keyDate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KeyDateRepository keyDateRepository;

    public KeyDateResource(KeyDateRepository keyDateRepository) {
        this.keyDateRepository = keyDateRepository;
    }

    /**
     * {@code POST  /key-dates} : Create a new keyDate.
     *
     * @param keyDate the keyDate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new keyDate, or with status {@code 400 (Bad Request)} if the keyDate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/key-dates")
    public ResponseEntity<KeyDate> createKeyDate(@RequestBody KeyDate keyDate) throws URISyntaxException {
        log.debug("REST request to save KeyDate : {}", keyDate);
        if (keyDate.getId() != null) {
            throw new BadRequestAlertException("A new keyDate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KeyDate result = keyDateRepository.save(keyDate);
        return ResponseEntity.created(new URI("/api/key-dates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /key-dates} : Updates an existing keyDate.
     *
     * @param keyDate the keyDate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated keyDate,
     * or with status {@code 400 (Bad Request)} if the keyDate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the keyDate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/key-dates")
    public ResponseEntity<KeyDate> updateKeyDate(@RequestBody KeyDate keyDate) throws URISyntaxException {
        log.debug("REST request to update KeyDate : {}", keyDate);
        if (keyDate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KeyDate result = keyDateRepository.save(keyDate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, keyDate.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /key-dates} : get all the keyDates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of keyDates in body.
     */
    @GetMapping("/key-dates")
    public List<KeyDate> getAllKeyDates() {
        log.debug("REST request to get all KeyDates");
        return keyDateRepository.findAll();
    }

    /**
     * {@code GET  /key-dates/:id} : get the "id" keyDate.
     *
     * @param id the id of the keyDate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the keyDate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/key-dates/{id}")
    public ResponseEntity<KeyDate> getKeyDate(@PathVariable Long id) {
        log.debug("REST request to get KeyDate : {}", id);
        Optional<KeyDate> keyDate = keyDateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(keyDate);
    }

    /**
     * {@code DELETE  /key-dates/:id} : delete the "id" keyDate.
     *
     * @param id the id of the keyDate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/key-dates/{id}")
    public ResponseEntity<Void> deleteKeyDate(@PathVariable Long id) {
        log.debug("REST request to delete KeyDate : {}", id);
        keyDateRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
