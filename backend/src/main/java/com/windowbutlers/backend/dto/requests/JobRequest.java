package com.windowbutlers.backend.dto.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.windowbutlers.backend.validation.ValidDate;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class JobRequest {
    
    @NotBlank(message = "Job name is required")
    private String title;

    @NotNull(message = "Job date is required")
    @ValidDate(message = "Date must be in the format MM-DD-YYYY")
    private String dateCompleted;

    @Min(value=0, message = "Labor hours must be a positive integer")
    private Integer laborHours;

    @Size(max = 255, message = "Notes must be less then 255 characters")
    private String notes;

    @NotBlank(message = "Job difficulty is required")
    private String difficulty;

    @JsonProperty("homeID")
    @NotNull(message = "Home id is required")
    private Integer homeID;

    @NotNull(message = "Is paid is required")
    private Boolean isPaid;
}
