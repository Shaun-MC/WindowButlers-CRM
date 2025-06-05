package com.windowbutlers.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = IDValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidID {
    String message() default "Invalid ID input";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
