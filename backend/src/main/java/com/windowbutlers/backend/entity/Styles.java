package com.windowbutlers.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.windowbutlers.backend.enums.StyleLabels;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "styles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Styles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Integer id;

    @JsonBackReference
    @NotNull
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", referencedColumnName = "id", nullable = false)
    private Jobs job;

    @JsonProperty("label")
    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "label", nullable = false)
    private StyleLabels label;

    // Only relevant for styles like "Windows" or "Trees"
    @JsonProperty("large")
    @Column(nullable = true)
    private Integer large;

    @JsonProperty("small")
    @Column(nullable = true)
    private Integer small;
}