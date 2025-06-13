import React from 'react';
import { ReactComponent as RequiredIcon } from '../../../icons/exclamation-circle.svg';
import '../AddDataModal.css';

const FormInputGroup = ({
    label,
    id,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    requiredMessage = '',
    className = '',
    ...props
}) => {
    return (
        <div className={`form-group ${className}`}>
            <label htmlFor={id} className="form-label">
                {label}
                {required && (
                    <RequiredIcon className="required-indicator" title={requiredMessage} />
                )}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="form-input"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export default FormInputGroup;