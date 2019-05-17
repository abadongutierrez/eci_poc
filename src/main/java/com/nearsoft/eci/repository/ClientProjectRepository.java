package com.nearsoft.eci.repository;

import com.nearsoft.eci.domain.ClientProject;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ClientProject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientProjectRepository extends JpaRepository<ClientProject, Long> {

}
