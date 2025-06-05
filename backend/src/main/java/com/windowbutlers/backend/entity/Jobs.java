package com.windowbutlers.backend.entity;

import com.windowbutlers.backend.enums.JobTitles;
import com.windowbutlers.backend.enums.JobRatings;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.List;
import java.sql.Date;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Jobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Integer id;

    @JsonProperty("title")
    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private JobTitles title;

    @JsonProperty("dateCompleted")
    @NotNull
    @Column(name = "date_completed", nullable = false)
    private Date dateCompleted;

    @JsonProperty("laborHours")
    @Column(name = "labor_hours", nullable = true)
    private Integer laborHours;

    @JsonProperty("notes")
    @Column(nullable = true)
    private String notes;

    @JsonProperty("difficulty")
    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(nullable = false)
    private JobRatings difficulty;

    @JsonProperty("isPaid")
    @Column(name = "is_paid", nullable = true)
    private Boolean isPaid;

    // Foreign key to the home table
    @JsonBackReference
    @NotNull
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "home_id", referencedColumnName = "id", nullable = false)
    private Homes home;

    @JsonProperty("homeID")
    public Integer getClientID() {
        return home != null ? home.getId() : null;
    }

    // Foreign key to the payment table
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id", referencedColumnName = "id", nullable = true)
    private Payments payment;

    @JsonProperty("paymentID")
    public Integer getPaymentID() {
        return payment != null ? payment.getId() : null;
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChristmasLights> lights;

    @JsonManagedReference
    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Styles> jobStyles;
}
