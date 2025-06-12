import React from 'react';
import '../AddDataModal.css';

const FormSection = ({ children, className = '' }) => {
    return (
        <div className={`form-section ${className}`}>
            {children}
        </div>
    );
};

const FormRow = ({ children, className = '' }) => {
    return (
        <div className={`form-row ${className}`}>
            {children}
        </div>
    );
};

const FormCaption = ({ text, inline = false, className = '' }) => {
    const captionClass = inline ? 'form-caption-inline' : 'form-caption';

    return (
        <div className={`${captionClass} ${className}`}>
            <p className="caption-text">
                <em>{text}</em>
            </p>
        </div>
    );
};

const FormActions = ({ children, className = '' }) => {
    return (
        <div className={`form-actions ${className}`}>
            {children}
        </div>
    );
};

export { FormSection, FormRow, FormCaption, FormActions };