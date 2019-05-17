package com.nearsoft.eci.repository;

import com.nearsoft.eci.domain.EmployeeClientAssignment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EmployeeClientAssignment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeClientAssignmentRepository extends JpaRepository<EmployeeClientAssignment, Long> {

}
