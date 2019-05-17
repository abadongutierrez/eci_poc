package com.nearsoft.eci.repository;

import com.nearsoft.eci.domain.EmployeeSkill;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EmployeeSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Long> {

}
