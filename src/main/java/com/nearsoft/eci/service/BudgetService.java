package com.nearsoft.eci.service;

import com.nearsoft.eci.domain.Budget;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Budget}.
 */
public interface BudgetService {

    /**
     * Save a budget.
     *
     * @param budget the entity to save.
     * @return the persisted entity.
     */
    Budget save(Budget budget);

    /**
     * Get all the budgets.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Budget> findAll(Pageable pageable);


    /**
     * Get the "id" budget.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Budget> findOne(Long id);

    /**
     * Delete the "id" budget.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
