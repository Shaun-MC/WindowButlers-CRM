import React from 'react';
import '../AddDataModal.css';

const RadioGroup = ({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
    requiredMessage = '',
    className = ''
}) => {
    return (
        <div className={`radio-group ${className}`}>
            <div className="radio-label-wrapper">
                <span className="radio-group-label">
                    {label}
                    {required && (
                        <span className="required-indicator" title={requiredMessage}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </span>
                    )}
                </span>
            </div>
            <div className="radio-options">
                {options.map((option) => (
                    <label key={option.value} className="radio-option">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="radio-input"
                        />
                        <span className="radio-custom"></span>
                        <span className="radio-text">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RadioGroup;