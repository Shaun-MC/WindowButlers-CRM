package com.windowbutlers.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientHomeKey implements Serializable {

    @Column(name = "client_id", columnDefinition = "uuid", nullable = false)
    @NotNull
    private Integer clientID;

    @Column(name = "home_id", columnDefinition = "uuid", nullable = false)
    @NotNull
    private Integer homeID;

    // Not necessary to implement - don't want to run into issues w/ out them
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof ClientHomeKey))
            return false;
        ClientHomeKey that = (ClientHomeKey) o;
        return Objects.equals(clientID, that.clientID) && Objects.equals(homeID, that.homeID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clientID, homeID);
    }
}
