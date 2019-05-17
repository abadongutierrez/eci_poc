package com.nearsoft.eci.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.nearsoft.eci.domain.enumeration.LocationType;

import com.nearsoft.eci.domain.enumeration.Gender;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "birthday", nullable = false)
    private Instant birthday;

    @NotNull
    @Column(name = "jhi_role", nullable = false)
    private String role;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "location", nullable = false)
    private LocationType location;

    @NotNull
    @Column(name = "experience_start_year", nullable = false)
    private Integer experienceStartYear;

    @Column(name = "active")
    private Boolean active;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @OneToOne
    @JoinColumn(unique = true)
    private ContactInfo contactInfo;

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<KeyDate> keyDates = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<NextOfKin> nextOfKins = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EmployeeClientAssignment> assignments = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EmployeeSkill> skills = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EmployeeBudgetAssignment> budgets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("employees")
    private Employee manager;

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

    public Employee firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public Employee middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public Employee lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Instant getBirthday() {
        return birthday;
    }

    public Employee birthday(Instant birthday) {
        this.birthday = birthday;
        return this;
    }

    public void setBirthday(Instant birthday) {
        this.birthday = birthday;
    }

    public String getRole() {
        return role;
    }

    public Employee role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocationType getLocation() {
        return location;
    }

    public Employee location(LocationType location) {
        this.location = location;
        return this;
    }

    public void setLocation(LocationType location) {
        this.location = location;
    }

    public Integer getExperienceStartYear() {
        return experienceStartYear;
    }

    public Employee experienceStartYear(Integer experienceStartYear) {
        this.experienceStartYear = experienceStartYear;
        return this;
    }

    public void setExperienceStartYear(Integer experienceStartYear) {
        this.experienceStartYear = experienceStartYear;
    }

    public Boolean isActive() {
        return active;
    }

    public Employee active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Gender getGender() {
        return gender;
    }

    public Employee gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public ContactInfo getContactInfo() {
        return contactInfo;
    }

    public Employee contactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
        return this;
    }

    public void setContactInfo(ContactInfo contactInfo) {
        this.contactInfo = contactInfo;
    }

    public Set<KeyDate> getKeyDates() {
        return keyDates;
    }

    public Employee keyDates(Set<KeyDate> keyDates) {
        this.keyDates = keyDates;
        return this;
    }

    public Employee addKeyDates(KeyDate keyDate) {
        this.keyDates.add(keyDate);
        keyDate.setEmployee(this);
        return this;
    }

    public Employee removeKeyDates(KeyDate keyDate) {
        this.keyDates.remove(keyDate);
        keyDate.setEmployee(null);
        return this;
    }

    public void setKeyDates(Set<KeyDate> keyDates) {
        this.keyDates = keyDates;
    }

    public Set<NextOfKin> getNextOfKins() {
        return nextOfKins;
    }

    public Employee nextOfKins(Set<NextOfKin> nextOfKins) {
        this.nextOfKins = nextOfKins;
        return this;
    }

    public Employee addNextOfKins(NextOfKin nextOfKin) {
        this.nextOfKins.add(nextOfKin);
        nextOfKin.setEmployee(this);
        return this;
    }

    public Employee removeNextOfKins(NextOfKin nextOfKin) {
        this.nextOfKins.remove(nextOfKin);
        nextOfKin.setEmployee(null);
        return this;
    }

    public void setNextOfKins(Set<NextOfKin> nextOfKins) {
        this.nextOfKins = nextOfKins;
    }

    public Set<EmployeeClientAssignment> getAssignments() {
        return assignments;
    }

    public Employee assignments(Set<EmployeeClientAssignment> employeeClientAssignments) {
        this.assignments = employeeClientAssignments;
        return this;
    }

    public Employee addAssignments(EmployeeClientAssignment employeeClientAssignment) {
        this.assignments.add(employeeClientAssignment);
        employeeClientAssignment.setEmployee(this);
        return this;
    }

    public Employee removeAssignments(EmployeeClientAssignment employeeClientAssignment) {
        this.assignments.remove(employeeClientAssignment);
        employeeClientAssignment.setEmployee(null);
        return this;
    }

    public void setAssignments(Set<EmployeeClientAssignment> employeeClientAssignments) {
        this.assignments = employeeClientAssignments;
    }

    public Set<EmployeeSkill> getSkills() {
        return skills;
    }

    public Employee skills(Set<EmployeeSkill> employeeSkills) {
        this.skills = employeeSkills;
        return this;
    }

    public Employee addSkills(EmployeeSkill employeeSkill) {
        this.skills.add(employeeSkill);
        employeeSkill.setEmployee(this);
        return this;
    }

    public Employee removeSkills(EmployeeSkill employeeSkill) {
        this.skills.remove(employeeSkill);
        employeeSkill.setEmployee(null);
        return this;
    }

    public void setSkills(Set<EmployeeSkill> employeeSkills) {
        this.skills = employeeSkills;
    }

    public Set<EmployeeBudgetAssignment> getBudgets() {
        return budgets;
    }

    public Employee budgets(Set<EmployeeBudgetAssignment> employeeBudgetAssignments) {
        this.budgets = employeeBudgetAssignments;
        return this;
    }

    public Employee addBudgets(EmployeeBudgetAssignment employeeBudgetAssignment) {
        this.budgets.add(employeeBudgetAssignment);
        employeeBudgetAssignment.setEmployee(this);
        return this;
    }

    public Employee removeBudgets(EmployeeBudgetAssignment employeeBudgetAssignment) {
        this.budgets.remove(employeeBudgetAssignment);
        employeeBudgetAssignment.setEmployee(null);
        return this;
    }

    public void setBudgets(Set<EmployeeBudgetAssignment> employeeBudgetAssignments) {
        this.budgets = employeeBudgetAssignments;
    }

    public Employee getManager() {
        return manager;
    }

    public Employee manager(Employee employee) {
        this.manager = employee;
        return this;
    }

    public void setManager(Employee employee) {
        this.manager = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birthday='" + getBirthday() + "'" +
            ", role='" + getRole() + "'" +
            ", location='" + getLocation() + "'" +
            ", experienceStartYear=" + getExperienceStartYear() +
            ", active='" + isActive() + "'" +
            ", gender='" + getGender() + "'" +
            "}";
    }
}
