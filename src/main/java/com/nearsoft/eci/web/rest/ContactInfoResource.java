package com.nearsoft.eci.web.rest;

import com.nearsoft.eci.domain.ContactInfo;
import com.nearsoft.eci.repository.ContactInfoRepository;
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
 * REST controller for managing {@link com.nearsoft.eci.domain.ContactInfo}.
 */
@RestController
@RequestMapping("/api")
public class ContactInfoResource {

    private final Logger log = LoggerFactory.getLogger(ContactInfoResource.class);

    private static final String ENTITY_NAME = "contactInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContactInfoRepository contactInfoRepository;

    public ContactInfoResource(ContactInfoRepository contactInfoRepository) {
        this.contactInfoRepository = contactInfoRepository;
    }

    /**
     * {@code POST  /contact-infos} : Create a new contactInfo.
     *
     * @param contactInfo the contactInfo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contactInfo, or with status {@code 400 (Bad Request)} if the contactInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contact-infos")
    public ResponseEntity<ContactInfo> createContactInfo(@Valid @RequestBody ContactInfo contactInfo) throws URISyntaxException {
        log.debug("REST request to save ContactInfo : {}", contactInfo);
        if (contactInfo.getId() != null) {
            throw new BadRequestAlertException("A new contactInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactInfo result = contactInfoRepository.save(contactInfo);
        return ResponseEntity.created(new URI("/api/contact-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contact-infos} : Updates an existing contactInfo.
     *
     * @param contactInfo the contactInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contactInfo,
     * or with status {@code 400 (Bad Request)} if the contactInfo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contactInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contact-infos")
    public ResponseEntity<ContactInfo> updateContactInfo(@Valid @RequestBody ContactInfo contactInfo) throws URISyntaxException {
        log.debug("REST request to update ContactInfo : {}", contactInfo);
        if (contactInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactInfo result = contactInfoRepository.save(contactInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contactInfo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contact-infos} : get all the contactInfos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contactInfos in body.
     */
    @GetMapping("/contact-infos")
    public List<ContactInfo> getAllContactInfos() {
        log.debug("REST request to get all ContactInfos");
        return contactInfoRepository.findAll();
    }

    /**
     * {@code GET  /contact-infos/:id} : get the "id" contactInfo.
     *
     * @param id the id of the contactInfo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contactInfo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contact-infos/{id}")
    public ResponseEntity<ContactInfo> getContactInfo(@PathVariable Long id) {
        log.debug("REST request to get ContactInfo : {}", id);
        Optional<ContactInfo> contactInfo = contactInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contactInfo);
    }

    /**
     * {@code DELETE  /contact-infos/:id} : delete the "id" contactInfo.
     *
     * @param id the id of the contactInfo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contact-infos/{id}")
    public ResponseEntity<Void> deleteContactInfo(@PathVariable Long id) {
        log.debug("REST request to delete ContactInfo : {}", id);
        contactInfoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
