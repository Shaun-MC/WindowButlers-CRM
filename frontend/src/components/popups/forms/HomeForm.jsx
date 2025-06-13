import React from 'react';
import FormInputGroup from './FormInputGroup.jsx';
import RadioGroup from '../input/RadioGroup.jsx';
import { FormSection, FormRow } from './FormSection';
import './HomeForm.css';

const HomeForm = ({ formData, onInputChange }) => {
    const handleInputChange = (field) => (e) => {
        onInputChange(field, e.target.value);
    };

    const handleRadioChange = (field) => (value) => {
        onInputChange(field, value);
    };

    const holidayLightsOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
    ];

    return (
        <FormSection className="home-form">
            {/* Address Row: Street Address, City */}
            <FormRow>
                <FormInputGroup
                    label="Street Address"
                    id="streetAddress"
                    type="text"
                    value={formData.streetAddress || ''}
                    onChange={handleInputChange('streetAddress')}
                    placeholder="Enter street address"
                />
                <FormInputGroup
                    label="City"
                    id="city"
                    type="text"
                    value={formData.city || ''}
                    onChange={handleInputChange('city')}
                    placeholder="Enter city"
                />
            </FormRow>

            {/* Zip Code Row with State/Country Info */}
            <FormRow>
                <FormInputGroup
                    label="Zip Code"
                    id="zipCode"
                    type="text"
                    value={formData.zipCode || ''}
                    onChange={handleInputChange('zipCode')}
                    placeholder="Enter zip code"
                    className="zip-code-input"
                />
                <div className="state-country-info">
                    <span className="info-text">Assuming WA, USA for State/Country</span>
                </div>
            </FormRow>

            {/* Holiday Lights Section */}
            <div className="holiday-lights-section">
                <h3 className="section-title">Holiday Lights</h3>
                <div className="section-subtitle">
                    If they want a Holiday Lights Setup and own their own lights, select Yes, select No otherwise
                </div>
                <RadioGroup
                    label=""
                    name="holidayLights"
                    value={formData.holidayLights || ''}
                    onChange={handleRadioChange('holidayLights')}
                    options={holidayLightsOptions}
                />
            </div>
        </FormSection>
    );
};

export default HomeForm;