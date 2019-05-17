package com.nearsoft.eci.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A EmployeeClientAssignment.
 */
@Entity
@Table(name = "employee_client_assignment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EmployeeClientAssignment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "jhi_usage", nullable = false)
    private Integer usage;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @ManyToOne
    @JsonIgnoreProperties("assignments")
    private Employee employee;

    @ManyToOne
    @JsonIgnoreProperties("assignments")
    private ClientProject project;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUsage() {
        return usage;
    }

    public EmployeeClientAssignment usage(Integer usage) {
        this.usage = usage;
        return this;
    }

    public void setUsage(Integer usage) {
        this.usage = usage;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public EmployeeClientAssignment startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public EmployeeClientAssignment endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public EmployeeClientAssignment employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public ClientProject getProject() {
        return project;
    }

    public EmployeeClientAssignment project(ClientProject clientProject) {
        this.project = clientProject;
        return this;
    }

    public void setProject(ClientProject clientProject) {
        this.project = clientProject;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmployeeClientAssignment)) {
            return false;
        }
        return id != null && id.equals(((EmployeeClientAssignment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EmployeeClientAssignment{" +
            "id=" + getId() +
            ", usage=" + getUsage() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
