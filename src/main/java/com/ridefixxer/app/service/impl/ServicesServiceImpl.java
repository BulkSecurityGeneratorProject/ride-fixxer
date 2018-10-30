package com.ridefixxer.app.service.impl;

import com.ridefixxer.app.service.ServicesService;
import com.ridefixxer.app.domain.Services;
import com.ridefixxer.app.repository.ServicesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Services.
 */
@Service
@Transactional
public class ServicesServiceImpl implements ServicesService {

    private final Logger log = LoggerFactory.getLogger(ServicesServiceImpl.class);

    private ServicesRepository servicesRepository;

    public ServicesServiceImpl(ServicesRepository servicesRepository) {
        this.servicesRepository = servicesRepository;
    }

    /**
     * Save a services.
     *
     * @param services the entity to save
     * @return the persisted entity
     */
    @Override
    public Services save(Services services) {
        log.debug("Request to save Services : {}", services);
        return servicesRepository.save(services);
    }

    /**
     * Get all the services.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Services> findAll() {
        log.debug("Request to get all Services");
        return servicesRepository.findAll();
    }


    /**
     * Get one services by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Services> findOne(Long id) {
        log.debug("Request to get Services : {}", id);
        return servicesRepository.findById(id);
    }

    /**
     * Delete the services by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Services : {}", id);
        servicesRepository.deleteById(id);
    }
}
