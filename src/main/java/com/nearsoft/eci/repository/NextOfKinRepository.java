package com.nearsoft.eci.repository;

import com.nearsoft.eci.domain.NextOfKin;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NextOfKin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NextOfKinRepository extends JpaRepository<NextOfKin, Long> {

}
