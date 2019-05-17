package com.nearsoft.eci.service.impl;

import com.nearsoft.eci.service.BudgetService;
import com.nearsoft.eci.domain.Budget;
import com.nearsoft.eci.repository.BudgetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Budget}.
 */
@Service
@Transactional
public class BudgetServiceImpl implements BudgetService {

    private final Logger log = LoggerFactory.getLogger(BudgetServiceImpl.class);

    private final BudgetRepository budgetRepository;

    public BudgetServiceImpl(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    /**
     * Save a budget.
     *
     * @param budget the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Budget save(Budget budget) {
        log.debug("Request to save Budget : {}", budget);
        return budgetRepository.save(budget);
    }

    /**
     * Get all the budgets.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Budget> findAll(Pageable pageable) {
        log.debug("Request to get all Budgets");
        return budgetRepository.findAll(pageable);
    }


    /**
     * Get one budget by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Budget> findOne(Long id) {
        log.debug("Request to get Budget : {}", id);
        return budgetRepository.findById(id);
    }

    /**
     * Delete the budget by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Budget : {}", id);
        budgetRepository.deleteById(id);
    }
}
