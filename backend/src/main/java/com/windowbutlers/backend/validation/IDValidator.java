package com.windowbutlers.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IDValidator implements ConstraintValidator<ValidID, Integer> {
    
    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        return value != null && value >= 0 && value <= Integer.MAX_VALUE; 
    }
}
