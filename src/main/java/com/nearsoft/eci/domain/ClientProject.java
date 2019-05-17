package com.nearsoft.eci.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ClientProject.
 */
@Entity
@Table(name = "client_project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ClientProject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "project")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EmployeeClientAssignment> assignments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("clientProjects")
    private Client client;

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

    public ClientProject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public ClientProject code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public ClientProject description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<EmployeeClientAssignment> getAssignments() {
        return assignments;
    }

    public ClientProject assignments(Set<EmployeeClientAssignment> employeeClientAssignments) {
        this.assignments = employeeClientAssignments;
        return this;
    }

    public ClientProject addAssignments(EmployeeClientAssignment employeeClientAssignment) {
        this.assignments.add(employeeClientAssignment);
        employeeClientAssignment.setProject(this);
        return this;
    }

    public ClientProject removeAssignments(EmployeeClientAssignment employeeClientAssignment) {
        this.assignments.remove(employeeClientAssignment);
        employeeClientAssignment.setProject(null);
        return this;
    }

    public void setAssignments(Set<EmployeeClientAssignment> employeeClientAssignments) {
        this.assignments = employeeClientAssignments;
    }

    public Client getClient() {
        return client;
    }

    public ClientProject client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClientProject)) {
            return false;
        }
        return id != null && id.equals(((ClientProject) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ClientProject{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
