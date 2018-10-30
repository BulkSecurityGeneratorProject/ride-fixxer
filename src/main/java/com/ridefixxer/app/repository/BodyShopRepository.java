package com.ridefixxer.app.repository;

import com.ridefixxer.app.domain.BodyShop;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BodyShop entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BodyShopRepository extends JpaRepository<BodyShop, Long> {

}
