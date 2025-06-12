import React from 'react';
import FormInputGroup from './FormInputGroup';
import { FormSection, FormRow, FormCaption } from './FormSection';

const ClientForm = ({ formData, onInputChange }) => {
    const handleInputChange = (field) => (e) => {
        onInputChange(field, e.target.value);
    };

    return (
        <FormSection>
            {/* First Row: First Name, Last Name */}
            <FormRow>
                <FormInputGroup
                    label="First Name"
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    placeholder="Enter first name"
                />
                <FormInputGroup
                    label="Last Name"
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    placeholder="Enter last name"
                />
            </FormRow>

            {/* Second Row: Email, Phone Number */}
            <FormRow>
                <FormInputGroup
                    label="Email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="Enter email address"
                    required={true}
                    requiredMessage="One of Email or Phone Number must be provided"
                />
                <FormInputGroup
                    label="Phone Number"
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange('phoneNumber')}
                    placeholder="Enter phone number"
                    required={true}
                    requiredMessage="One of Email or Phone Number must be provided"
                />
            </FormRow>

            {/* Required Field Caption */}
            <FormCaption
                text="One of the two must be input"
                inline={true}
            />
        </FormSection>
    );
};

export default ClientForm;