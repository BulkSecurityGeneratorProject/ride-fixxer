package com.ridefixxer.app.repository;

import com.ridefixxer.app.domain.Services;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Services entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServicesRepository extends JpaRepository<Services, Long> {

}
