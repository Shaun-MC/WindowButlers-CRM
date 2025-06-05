package com.windowbutlers.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Clients {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Integer id;

    @JsonProperty("firstName")
    @NotNull
    @Column(name="first_name", nullable=false)
    private String firstName;

    @JsonProperty("lastName")
    @NotNull
    @Column(name="last_name", nullable=false)
    private String lastName;

    @JsonProperty("email")
    @Column(name="email", nullable=true, unique=true)
    private String email; 

    @JsonProperty("phone_number")
    @Column(name="phone_number", nullable=true, unique=true)
    private String phoneNumber;

    @JsonManagedReference
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    @Column(nullable=true)
    private List<Payments> payments;
}
