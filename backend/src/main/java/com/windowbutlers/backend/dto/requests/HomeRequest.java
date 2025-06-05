package com.windowbutlers.backend.dto.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class HomeRequest {
    
    @Size(max = 255, message = "Notes must be less then 255 characters")
    private String notes;

    private String pictureDirectoryURL;

    @NotBlank(message = "Address line 1 is required")
    @Size(min = 2, max = 255, message = "Address line 1 must be between 2 and 255 characters")
    private String addressLine1;

    @NotBlank(message = "Zip code is required")
    @Size(max = 255, message = "City must be less then 255 characters")
    private String city;

    @NotBlank(message = "Zip code is required")
    @Size(max = 10, message = "Zip code must be less then 10 characters")
    private String zipCode;

    @Size(max = 100, message = "Power source location must be less then 100 characters")
    private String powerSourceLocation;

    private Boolean hasOwnLights;
}
