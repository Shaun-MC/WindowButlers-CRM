import React from 'react';
import { FormSection } from './FormSection';
import './PlaceholderForm.css'; 

const PlaceholderForm = ({ dataType, showEmpty = false }) => {
    return (
        <FormSection>
            <div className="placeholder-content">
                {!showEmpty && dataType && (
                    <p>Form fields for {dataType} will be implemented here.</p>
                )}
            </div>
        </FormSection>
    );
};

export default PlaceholderForm;