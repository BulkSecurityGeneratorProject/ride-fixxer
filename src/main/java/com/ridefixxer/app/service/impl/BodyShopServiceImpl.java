package com.ridefixxer.app.service.impl;

import com.ridefixxer.app.service.BodyShopService;
import com.ridefixxer.app.domain.BodyShop;
import com.ridefixxer.app.repository.BodyShopRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing BodyShop.
 */
@Service
@Transactional
public class BodyShopServiceImpl implements BodyShopService {

    private final Logger log = LoggerFactory.getLogger(BodyShopServiceImpl.class);

    private BodyShopRepository bodyShopRepository;

    public BodyShopServiceImpl(BodyShopRepository bodyShopRepository) {
        this.bodyShopRepository = bodyShopRepository;
    }

    /**
     * Save a bodyShop.
     *
     * @param bodyShop the entity to save
     * @return the persisted entity
     */
    @Override
    public BodyShop save(BodyShop bodyShop) {
        log.debug("Request to save BodyShop : {}", bodyShop);
        return bodyShopRepository.save(bodyShop);
    }

    /**
     * Get all the bodyShops.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BodyShop> findAll() {
        log.debug("Request to get all BodyShops");
        return bodyShopRepository.findAll();
    }


    /**
     * Get one bodyShop by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BodyShop> findOne(Long id) {
        log.debug("Request to get BodyShop : {}", id);
        return bodyShopRepository.findById(id);
    }

    /**
     * Delete the bodyShop by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BodyShop : {}", id);
        bodyShopRepository.deleteById(id);
    }
}
