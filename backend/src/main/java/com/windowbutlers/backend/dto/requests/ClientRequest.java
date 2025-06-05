package com.windowbutlers.backend.dto.requests;

import com.windowbutlers.backend.validation.ValidEmail;
import com.windowbutlers.backend.validation.ValidPhoneNumber;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ClientRequest {

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 20, message = "First name must be between 2 and 20 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 30, message = "Last name must be between 2 and 30 characters")
    private String lastName;

    @ValidEmail(message = "Email is in an invalid format")
    @Size(min = 2, max = 100, message = "Email must be between 2 and 100 characters")
    private String email;

    @ValidPhoneNumber(message = "Phone number is in an invalid format")
    @Size(min = 12, max = 12, message = "Phone number must 12 characters. EX: '123-456-7890'")
    private String phoneNumber;
}
