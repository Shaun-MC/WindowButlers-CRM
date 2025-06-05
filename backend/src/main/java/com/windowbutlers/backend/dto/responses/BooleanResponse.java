package com.windowbutlers.backend.dto.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class BooleanResponse {
    
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("value")
    private boolean value;
}
