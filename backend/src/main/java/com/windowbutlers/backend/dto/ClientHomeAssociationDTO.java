package com.windowbutlers.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientHomeAssociationDTO {
    
    private Integer clientID;
    private Integer homeID;
    private String relationship;
}
