import React, { useState } from 'react';
import './AddDataModal.css';

const AddDataModal = ({ onClose }) => {
    const [selectedType, setSelectedType] = useState('Client');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

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

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Add Data</h2>
                    <button className="close-button" onClick={onClose} aria-label="Close modal">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        {/* Data Type Selection */}
                        <div className="form-section">
                            <div className="form-row dropdown-row">
                                <label className="form-label dropdown-label">
                                    Input Data Type
                                </label>
                                <select
                                    value={selectedType}
                                    onChange={handleTypeChange}
                                    className="form-select"
                                >
                                    <option value="Client">Client</option>
                                    <option value="Home">Home</option>
                                    <option value="Job">Job</option>
                                    <option value="Christmas Lights">Christmas Lights</option>
                                </select>
                            </div>
                        </div>

                        {/* Conditional Form Content */}
                        {selectedType === 'Client' && (
                            <div className="form-section">
                                {/* First Row: First Name, Last Name */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="firstName" className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className="form-input"
                                            placeholder="Enter first name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName" className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className="form-input"
                                            placeholder="Enter last name"
                                        />
                                    </div>
                                </div>

                                {/* Second Row: Email, Phone Number */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                            <span className="required-indicator" title="One of Email or Phone Number must be provided">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="8" x2="12" y2="12" />
                                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                                </svg>
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="form-input"
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber" className="form-label">
                                            Phone Number
                                            <span className="required-indicator" title="One of Email or Phone Number must be provided">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="8" x2="12" y2="12" />
                                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                                </svg>
                                            </span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            className="form-input"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>

                                {/* Required Field Caption - No border bar */}
                                <div className="form-caption-inline">
                                    <p className="caption-text">
                                        <em>One of the two must be input</em>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Placeholder for other data types */}
                        {selectedType !== 'Client' && (
                            <div className="form-section">
                                <div className="placeholder-content">
                                    <p>Form fields for {selectedType} will be implemented here.</p>
                                </div>
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="form-actions">
                            <button type="button" onClick={onClose} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Add {selectedType}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDataModal;