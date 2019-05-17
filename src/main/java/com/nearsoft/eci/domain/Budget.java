package com.nearsoft.eci.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Budget.
 */
@Entity
@Table(name = "budget")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Budget implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "budget")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EmployeeBudgetAssignment> assignments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Budget name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<EmployeeBudgetAssignment> getAssignments() {
        return assignments;
    }

    public Budget assignments(Set<EmployeeBudgetAssignment> employeeBudgetAssignments) {
        this.assignments = employeeBudgetAssignments;
        return this;
    }

    public Budget addAssignments(EmployeeBudgetAssignment employeeBudgetAssignment) {
        this.assignments.add(employeeBudgetAssignment);
        employeeBudgetAssignment.setBudget(this);
        return this;
    }

    public Budget removeAssignments(EmployeeBudgetAssignment employeeBudgetAssignment) {
        this.assignments.remove(employeeBudgetAssignment);
        employeeBudgetAssignment.setBudget(null);
        return this;
    }

    public void setAssignments(Set<EmployeeBudgetAssignment> employeeBudgetAssignments) {
        this.assignments = employeeBudgetAssignments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Budget)) {
            return false;
        }
        return id != null && id.equals(((Budget) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Budget{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
