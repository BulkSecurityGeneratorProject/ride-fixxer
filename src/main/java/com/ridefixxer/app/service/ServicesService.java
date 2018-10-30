package com.ridefixxer.app.service;

import com.ridefixxer.app.domain.Services;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Services.
 */
public interface ServicesService {

    /**
     * Save a services.
     *
     * @param services the entity to save
     * @return the persisted entity
     */
    Services save(Services services);

    /**
     * Get all the services.
     *
     * @return the list of entities
     */
    List<Services> findAll();


    /**
     * Get the "id" services.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Services> findOne(Long id);

    /**
     * Delete the "id" services.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
