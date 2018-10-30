package com.ridefixxer.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ridefixxer.app.domain.BodyShop;
import com.ridefixxer.app.service.BodyShopService;
import com.ridefixxer.app.web.rest.errors.BadRequestAlertException;
import com.ridefixxer.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BodyShop.
 */
@RestController
@RequestMapping("/api")
public class BodyShopResource {

    private final Logger log = LoggerFactory.getLogger(BodyShopResource.class);

    private static final String ENTITY_NAME = "bodyShop";

    private BodyShopService bodyShopService;

    public BodyShopResource(BodyShopService bodyShopService) {
        this.bodyShopService = bodyShopService;
    }

    /**
     * POST  /body-shops : Create a new bodyShop.
     *
     * @param bodyShop the bodyShop to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bodyShop, or with status 400 (Bad Request) if the bodyShop has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/body-shops")
    @Timed
    public ResponseEntity<BodyShop> createBodyShop(@RequestBody BodyShop bodyShop) throws URISyntaxException {
        log.debug("REST request to save BodyShop : {}", bodyShop);
        if (bodyShop.getId() != null) {
            throw new BadRequestAlertException("A new bodyShop cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BodyShop result = bodyShopService.save(bodyShop);
        return ResponseEntity.created(new URI("/api/body-shops/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /body-shops : Updates an existing bodyShop.
     *
     * @param bodyShop the bodyShop to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bodyShop,
     * or with status 400 (Bad Request) if the bodyShop is not valid,
     * or with status 500 (Internal Server Error) if the bodyShop couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/body-shops")
    @Timed
    public ResponseEntity<BodyShop> updateBodyShop(@RequestBody BodyShop bodyShop) throws URISyntaxException {
        log.debug("REST request to update BodyShop : {}", bodyShop);
        if (bodyShop.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BodyShop result = bodyShopService.save(bodyShop);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bodyShop.getId().toString()))
            .body(result);
    }

    /**
     * GET  /body-shops : get all the bodyShops.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bodyShops in body
     */
    @GetMapping("/body-shops")
    @Timed
    public List<BodyShop> getAllBodyShops() {
        log.debug("REST request to get all BodyShops");
        return bodyShopService.findAll();
    }

    /**
     * GET  /body-shops/:id : get the "id" bodyShop.
     *
     * @param id the id of the bodyShop to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bodyShop, or with status 404 (Not Found)
     */
    @GetMapping("/body-shops/{id}")
    @Timed
    public ResponseEntity<BodyShop> getBodyShop(@PathVariable Long id) {
        log.debug("REST request to get BodyShop : {}", id);
        Optional<BodyShop> bodyShop = bodyShopService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bodyShop);
    }

    /**
     * DELETE  /body-shops/:id : delete the "id" bodyShop.
     *
     * @param id the id of the bodyShop to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/body-shops/{id}")
    @Timed
    public ResponseEntity<Void> deleteBodyShop(@PathVariable Long id) {
        log.debug("REST request to delete BodyShop : {}", id);
        bodyShopService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
