package com.nearsoft.eci.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.nearsoft.eci.domain.enumeration.KinshipType;

/**
 * A NextOfKin.
 */
@Entity
@Table(name = "next_of_kin")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NextOfKin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "home_number")
    private String homeNumber;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "kinship", nullable = false)
    private KinshipType kinship;

    @ManyToOne
    @JsonIgnoreProperties("nextOfKins")
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public NextOfKin firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public NextOfKin lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public NextOfKin email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHomeNumber() {
        return homeNumber;
    }

    public NextOfKin homeNumber(String homeNumber) {
        this.homeNumber = homeNumber;
        return this;
    }

    public void setHomeNumber(String homeNumber) {
        this.homeNumber = homeNumber;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public NextOfKin mobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
        return this;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public KinshipType getKinship() {
        return kinship;
    }

    public NextOfKin kinship(KinshipType kinship) {
        this.kinship = kinship;
        return this;
    }

    public void setKinship(KinshipType kinship) {
        this.kinship = kinship;
    }

    public Employee getEmployee() {
        return employee;
    }

    public NextOfKin employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NextOfKin)) {
            return false;
        }
        return id != null && id.equals(((NextOfKin) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NextOfKin{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", homeNumber='" + getHomeNumber() + "'" +
            ", mobileNumber='" + getMobileNumber() + "'" +
            ", kinship='" + getKinship() + "'" +
            "}";
    }
}
