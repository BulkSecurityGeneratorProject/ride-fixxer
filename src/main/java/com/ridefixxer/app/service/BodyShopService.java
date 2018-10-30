package com.ridefixxer.app.service;

import com.ridefixxer.app.domain.BodyShop;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing BodyShop.
 */
public interface BodyShopService {

    /**
     * Save a bodyShop.
     *
     * @param bodyShop the entity to save
     * @return the persisted entity
     */
    BodyShop save(BodyShop bodyShop);

    /**
     * Get all the bodyShops.
     *
     * @return the list of entities
     */
    List<BodyShop> findAll();


    /**
     * Get the "id" bodyShop.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<BodyShop> findOne(Long id);

    /**
     * Delete the "id" bodyShop.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
