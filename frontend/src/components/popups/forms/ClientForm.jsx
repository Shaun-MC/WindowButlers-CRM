import React from 'react';
import FormInputGroup from './FormInputGroup.jsx';
import RadioGroup from '../input/RadioGroup.jsx';
import HomeForm from './HomeForm';
import { FormSection, FormRow, FormCaption } from './FormSection.jsx';

const ClientForm = ({ formData, onInputChange }) => {
    const handleInputChange = (field) => (e) => {
        onInputChange(field, e.target.value);
    };

    const handleRadioChange = (field) => (value) => {
        onInputChange(field, value);
    };

    const yesNoOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
    ];

    const homeAssociationOptions = [
        { value: 'existing', label: 'Existing' },
        { value: 'create_new', label: 'Create New' }
    ];

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

            {/* Home Association Section */}
            <div className="home-association-section">
                <RadioGroup
                    label="Associate with a Home?"
                    name="associateWithHome"
                    value={formData.associateWithHome || ''}
                    onChange={handleRadioChange('associateWithHome')}
                    options={yesNoOptions}
                />

                {/* Show home options only if user selects Yes */}
                {formData.associateWithHome === 'yes' && (
                    <div className="home-options">
                        <RadioGroup
                            label=""
                            name="homeOption"
                            value={formData.homeOption || ''}
                            onChange={handleRadioChange('homeOption')}
                            options={homeAssociationOptions}
                        />
                    </div>
                )}
            </div>

            {/* Show HomeForm if Create New is selected */}
            {formData.associateWithHome === 'yes' && formData.homeOption === 'create_new' && (
                <HomeForm
                    formData={formData}
                    onInputChange={onInputChange}
                />
            )}
        </FormSection>
    );
};

export default ClientForm;