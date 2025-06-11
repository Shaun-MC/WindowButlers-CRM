// frontend/src/components/search/EditPopup.jsx
import React, { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/x.svg';
import { ReactComponent as UserIcon } from '../../icons/person.svg';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import './EditPopup.css';

/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {function} props.onSave
 * @param {import('../types/index.js').SearchResult} props.result
 */
export const EditPopup = ({ isOpen, onClose, onSave, result }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
    });

    // Initialize form data when popup opens or result changes
    useEffect(() => {
        if (result && isOpen) {
            setFormData({
                name: result.name || '',
                email: result.email || '',
                phone: result.phone || '',
                address: {
                    street: result.address?.street || '',
                    city: result.address?.city || '',
                    state: result.address?.state || '',
                    zipCode: result.address?.zipCode || '',
                    country: result.address?.country || ''
                }
            });
        }
    }, [result, isOpen]);

    // Close popup on Escape key
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Close popup when clicking overlay
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        if (!formData.name.trim()) {
            alert('Name is required');
            return;
        }

        // Call the onSave callback with the updated data
        onSave({
            ...result,
            ...formData
        });

        onClose();
    };

    const getTypeIcon = () => {
        return result?.type === 'person' ? (
            <UserIcon className="edit-popup-type-icon edit-popup-type-icon--person" />
        ) : (
            <HomeIcon className="edit-popup-type-icon edit-popup-type-icon--home" />
        );
    };

    const getTitle = () => {
        const prefix = result?.type === 'person' ? 'Edit' : 'Edit';
        return `${prefix}: ${result?.name || 'Contact'}`;
    };

    if (!isOpen) return null;

    return (
        <div
            className={`edit-popup-overlay ${isOpen ? 'active' : ''}`}
            onClick={handleOverlayClick}
        >
            <div className="edit-popup">
                {/* Popup Header */}
                <div className="edit-popup-header">
                    <div className="edit-popup-header-info">
                        {getTypeIcon()}
                        <h2 className="edit-popup-title">
                            {getTitle()}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="edit-popup-close"
                        aria-label="Close edit popup"
                    >
                        <CloseIcon className="edit-popup-close-icon" />
                    </button>
                </div>

                {/* Popup Content */}
                <form onSubmit={handleSubmit} className="edit-popup-form">
                    <div className="edit-popup-content">
                        {/* Name Field */}
                        <div className="edit-popup-field">
                            <label htmlFor="edit-name" className="edit-popup-label">
                                Name *
                            </label>
                            <input
                                id="edit-name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="edit-popup-input"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="edit-popup-field">
                            <label htmlFor="edit-email" className="edit-popup-label">
                                Email
                            </label>
                            <input
                                id="edit-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="edit-popup-input"
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="edit-popup-field">
                            <label htmlFor="edit-phone" className="edit-popup-label">
                                Phone
                            </label>
                            <input
                                id="edit-phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className="edit-popup-input"
                            />
                        </div>

                        {/* Address Section */}
                        <div className="edit-popup-section">
                            <h3 className="edit-popup-section-title">Address</h3>

                            <div className="edit-popup-field">
                                <label htmlFor="edit-street" className="edit-popup-label">
                                    Street
                                </label>
                                <input
                                    id="edit-street"
                                    type="text"
                                    value={formData.address.street}
                                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                                    className="edit-popup-input"
                                />
                            </div>

                            <div className="edit-popup-field-group">
                                <div className="edit-popup-field">
                                    <label htmlFor="edit-city" className="edit-popup-label">
                                        City
                                    </label>
                                    <input
                                        id="edit-city"
                                        type="text"
                                        value={formData.address.city}
                                        onChange={(e) => handleInputChange('address.city', e.target.value)}
                                        className="edit-popup-input"
                                    />
                                </div>

                                <div className="edit-popup-field">
                                    <label htmlFor="edit-state" className="edit-popup-label">
                                        State
                                    </label>
                                    <input
                                        id="edit-state"
                                        type="text"
                                        value={formData.address.state}
                                        onChange={(e) => handleInputChange('address.state', e.target.value)}
                                        className="edit-popup-input"
                                    />
                                </div>

                                <div className="edit-popup-field">
                                    <label htmlFor="edit-zipCode" className="edit-popup-label">
                                        Zip Code
                                    </label>
                                    <input
                                        id="edit-zipCode"
                                        type="text"
                                        value={formData.address.zipCode}
                                        onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                                        className="edit-popup-input"
                                    />
                                </div>
                            </div>

                            <div className="edit-popup-field">
                                <label htmlFor="edit-country" className="edit-popup-label">
                                    Country
                                </label>
                                <input
                                    id="edit-country"
                                    type="text"
                                    value={formData.address.country}
                                    onChange={(e) => handleInputChange('address.country', e.target.value)}
                                    className="edit-popup-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Popup Footer */}
                    <div className="edit-popup-footer">
                        <button
                            type="button"
                            onClick={onClose}
                            className="edit-popup-button edit-popup-button--cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="edit-popup-button edit-popup-button--save"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPopup;