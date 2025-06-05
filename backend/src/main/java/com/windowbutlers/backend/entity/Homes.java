package com.windowbutlers.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "homes")
public class Homes {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Integer id;

    @JsonProperty("notes")
    @Column(nullable=true)
    private String notes;

    @JsonProperty("pictureDirectoryURL")
    @Column(name = "picture_directory_url", nullable = true, unique = true)
    private String pictureDirectoryURL;

    @JsonProperty("addressLine1")
    @NotNull
    @Column(name="address_line_1", nullable=false)
    private String addressLine1;

    @JsonProperty("city")
    @NotNull
    @Column(nullable = false)
    private String city;

    @JsonProperty("zipCode")
    @NotNull
    @Column(name="zip_code", nullable = false)
    private String zipCode;

    @JsonProperty("powerSourceLocation")
    @Column(name="power_source_location", nullable = true)
    private String powerSourceLocation;

    @JsonProperty("hasOwnLights")
    @Column(name="has_own_lights", nullable=true)
    private Boolean hasOwnLights;

    @JsonManagedReference
    @OneToMany(mappedBy = "home", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Jobs> jobs;
}
