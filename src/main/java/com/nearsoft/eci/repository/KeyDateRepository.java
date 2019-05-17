package com.nearsoft.eci.repository;

import com.nearsoft.eci.domain.KeyDate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the KeyDate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeyDateRepository extends JpaRepository<KeyDate, Long> {

}
