package com.windowbutlers.backend.entity;

import com.windowbutlers.backend.enums.RelationshipsToHome;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "clients_to_homes", uniqueConstraints = @UniqueConstraint(columnNames = {"client_id", "home_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientHomeAssociation {

    @EmbeddedId
    private ClientHomeKey id;

    @NotNull
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @MapsId("clientID")
    @JoinColumn(name = "client_id", referencedColumnName = "id", nullable = false)
    private Clients client;

    @NotNull
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @MapsId("homeID")
    @JoinColumn(name = "home_id", referencedColumnName = "id", nullable = false)
    private Homes home;

    @JsonProperty("relationship")
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "relationship", nullable = false)
    private RelationshipsToHome relationship;

    public void setClientID(Integer clientID, Clients client) {
        if (this.id == null) {
            this.id = new ClientHomeKey();
        }

        this.id.setClientID(clientID);
        this.client = client;
    }

    public void setHomeID(Integer homeID, Homes home) {
        if (this.id == null) {
            this.id = new ClientHomeKey();
        }
        this.id.setHomeID(homeID);
        this.home = home;
    }
}
