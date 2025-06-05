package com.windowbutlers.backend.dto.requests;

import com.windowbutlers.backend.enums.StyleLabels;
import com.windowbutlers.backend.validation.ValidEnum;
import com.windowbutlers.backend.validation.ValidID;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class StyleRequest {
    
    @NotBlank(message = "Job ID is required")
    @ValidID
    private Integer jobID;

    @NotBlank(message = "Style label is required")
    @ValidEnum(enumClass = StyleLabels.class)
    private String label;

    @Min(value=-1, message = "Large count must be a positive integer")
    private Integer large;

    @Min(value=-1, message = "Small count must be a positive integer")
    private Integer small;
}
