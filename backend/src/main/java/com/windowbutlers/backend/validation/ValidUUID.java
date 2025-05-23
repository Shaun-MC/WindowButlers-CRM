package com.windowbutlers.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UUIDValidator.class)
@Target({ ElementType.PARAMETER, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidUUID {
    String message() default "Invalid UUID format";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
