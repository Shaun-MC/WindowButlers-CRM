import React, { useState } from 'react';
import ModalBase from './ModalBase';
import CustomDropdown from './input/CustomDropdown.jsx';
import ClientForm from './forms/ClientForm.jsx';
import PlaceholderForm from './forms/PlaceholderForm.jsx';
import { FormSection, FormActions } from './forms/FormSection.jsx';
import './AddDataModal.css';

const AddDataModal = ({ onClose }) => {
    const [selectedType, setSelectedType] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        associateWithHome: '',
        homeOption: '',
        streetAddress: '',
        city: '',
        zipCode: '',
        holidayLights: ''
    });

    // Dropdown options configuration
    const dataTypeOptions = [
        { value: '', label: '-- Select --' },
        { value: 'Client', label: 'Client' },
        { value: 'Home', label: 'Home' },
        { value: 'Job', label: 'Job' },
        { value: 'Christmas Lights', label: 'Christmas Lights' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        // Reset form data when type changes
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            associateWithHome: '',
            homeOption: '',
            streetAddress: '',
            city: '',
            zipCode: '',
            holidayLights: ''
        });
    };

    const validateClientForm = () => {
        const errors = [];

        // Check if either email or phone number is provided
        if (!formData.email.trim() && !formData.phoneNumber.trim()) {
            errors.push('Either Email or Phone Number must be provided');
        }

        // If associating with home and creating new home, validate home fields
        if (formData.associateWithHome === 'yes' && formData.homeOption === 'create_new') {
            if (!formData.streetAddress.trim()) {
                errors.push('Street Address is required when creating a new home');
            }
            if (!formData.city.trim()) {
                errors.push('City is required when creating a new home');
            }
            if (!formData.zipCode.trim()) {
                errors.push('Zip Code is required when creating a new home');
            }
            if (!formData.holidayLights) {
                errors.push('Holiday Lights selection is required when creating a new home');
            }
        }

        // If user selected to associate with home, ensure they chose existing or create new
        if (formData.associateWithHome === 'yes' && !formData.homeOption) {
            errors.push('Please select either Existing or Create New for home association');
        }

        return errors;
    };

    const validateForm = () => {
        if (!selectedType) {
            return ['Please select a data type'];
        }

        switch (selectedType) {
            case 'Client':
                return validateClientForm();
            case 'Home':
            case 'Job':
            case 'Christmas Lights':
                // For now, these don't have validation since they use PlaceholderForm
                return [];
            default:
                return [];
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (validationErrors.length > 0) {
            setShowErrorPopup(true);
            return;
        }

        // Form is valid, proceed with submission
        console.log('Form submitted:', { type: selectedType, data: formData });
        setShowSuccessPopup(true);
    };

    const handleCloseErrorPopup = () => {
        setShowErrorPopup(false);
    };

    const handleCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
        onClose(); // Close the main modal after success popup is dismissed
    };

    const renderFormContent = () => {
        switch (selectedType) {
            case 'Client':
                return (
                    <ClientForm
                        formData={formData}
                        onInputChange={handleInputChange}
                    />
                );
            case '':
                return <PlaceholderForm dataType={selectedType} showEmpty={true} />;
            default:
                return <PlaceholderForm dataType={selectedType} showEmpty={false} />;
        }
    };

    return (
        <>
            <ModalBase
                isOpen={true}
                onClose={onClose}
                title="Add Data"
            >
                <form onSubmit={handleSubmit}>
                    {/* Data Type Selection */}
                    <FormSection>
                        <CustomDropdown
                            label="Input Data Type"
                            value={selectedType}
                            onChange={handleTypeChange}
                            options={dataTypeOptions}
                        />
                    </FormSection>

                    {/* Conditional Form Content */}
                    {renderFormContent()}

                    {/* Form Actions */}
                    <FormActions>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!selectedType}
                        >
                            Add {selectedType || 'Data'}
                        </button>
                    </FormActions>
                </form>
            </ModalBase>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="success-popup-overlay" onClick={handleCloseSuccessPopup}>
                    <div className="success-popup" onClick={(e) => e.stopPropagation()}>
                        <div className="success-popup-header">
                            <h3 className="success-popup-title">Success!</h3>
                            <button
                                className="success-popup-close"
                                onClick={handleCloseSuccessPopup}
                                aria-label="Close"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="success-popup-content">
                            <div className="success-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                                </svg>
                            </div>
                            <p className="success-popup-message">
                                Successfully Created a New {selectedType}
                            </p>
                        </div>
                        <div className="success-popup-actions">
                            <button
                                type="button"
                                onClick={handleCloseSuccessPopup}
                                className="btn btn-success"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Popup */}
            {showErrorPopup && (
                <div className="error-popup-overlay" onClick={handleCloseErrorPopup}>
                    <div className="error-popup" onClick={(e) => e.stopPropagation()}>
                        <div className="error-popup-header">
                            <h3 className="error-popup-title">Validation Error</h3>
                            <button
                                className="error-popup-close"
                                onClick={handleCloseErrorPopup}
                                aria-label="Close"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="error-popup-content">
                            <p className="error-popup-message">All required data not yet entered</p>
                        </div>
                        <div className="error-popup-actions">
                            <button
                                type="button"
                                onClick={handleCloseErrorPopup}
                                className="btn btn-primary"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddDataModal;