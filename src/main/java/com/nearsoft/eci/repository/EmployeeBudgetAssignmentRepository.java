package com.nearsoft.eci.repository;

import com.nearsoft.eci.domain.EmployeeBudgetAssignment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EmployeeBudgetAssignment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeBudgetAssignmentRepository extends JpaRepository<EmployeeBudgetAssignment, Long> {

}
