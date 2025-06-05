package com.windowbutlers.backend.dto.requests;

import com.windowbutlers.backend.validation.ValidID;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PaymentRequest {
    
    @NotNull(message = "Client ID is required")
    @ValidID(message = "Client ID must be a valid Integer")
    private Integer clientID;

    @DecimalMin(value = "0.01", message = "Payment amount must be greater than 0")
    private Double cost;
}
