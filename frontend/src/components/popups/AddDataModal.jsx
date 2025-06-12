import React, { useState } from 'react';
import ModalBase from './ModalBase';
import CustomDropdown from './input/CustomDropdown.jsx';
import ClientForm from './forms/ClientForm.jsx';
import PlaceholderForm from './forms/PlaceholderForm.jsx';
import { FormSection, FormActions } from './forms/FormSection.jsx';
import './AddDataModal.css';

const AddDataModal = ({ onClose }) => {
    const [selectedType, setSelectedType] = useState('Client');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    // Dropdown options configuration
    const dataTypeOptions = [
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
            phoneNumber: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation logic here
        console.log('Form submitted:', { type: selectedType, data: formData });
        onClose();
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
            default:
                return <PlaceholderForm dataType={selectedType} />;
        }
    };

    return (
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
                    >
                        Add {selectedType}
                    </button>
                </FormActions>
            </form>
        </ModalBase>
    );
};

export default AddDataModal;