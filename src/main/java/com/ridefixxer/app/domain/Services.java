package com.ridefixxer.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Services.
 */
@Entity
@Table(name = "services")
public class Services implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "time_aprox")
    private Instant timeAprox;

    @ManyToOne
    @JsonIgnoreProperties("services")
    private BodyShop bodyShop;

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

    public Services name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public Services price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Instant getTimeAprox() {
        return timeAprox;
    }

    public Services timeAprox(Instant timeAprox) {
        this.timeAprox = timeAprox;
        return this;
    }

    public void setTimeAprox(Instant timeAprox) {
        this.timeAprox = timeAprox;
    }

    public BodyShop getBodyShop() {
        return bodyShop;
    }

    public Services bodyShop(BodyShop bodyShop) {
        this.bodyShop = bodyShop;
        return this;
    }

    public void setBodyShop(BodyShop bodyShop) {
        this.bodyShop = bodyShop;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Services services = (Services) o;
        if (services.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), services.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Services{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", timeAprox='" + getTimeAprox() + "'" +
            "}";
    }
}
