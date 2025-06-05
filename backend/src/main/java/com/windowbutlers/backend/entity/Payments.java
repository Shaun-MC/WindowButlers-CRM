package com.windowbutlers.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Integer id;

    // Foreign key to the job table
    @JsonBackReference
    @NotNull
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id", nullable = false)
    private Clients client;

    @JsonProperty("clientID")
    public Integer getClientID() {
        return client != null ? client.getId() : null;
    }

    @JsonProperty("cost")
    @NotNull
    @Column(nullable = false)
    private Double cost;

    @JsonManagedReference
    @OneToMany(mappedBy = "payment")
    private List<Jobs> jobs;

    public boolean isFullfilled() {
        return jobs != null && !jobs.isEmpty() && jobs.stream().allMatch(Jobs::getIsPaid);
    }
}
