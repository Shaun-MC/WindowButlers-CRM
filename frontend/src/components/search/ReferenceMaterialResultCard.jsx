import React, { useState } from 'react';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import { ReactComponent as CalenderIcon } from '../../icons/calender.svg';
import { ReactComponent as PlusIcon } from '../../icons/circle-plus.svg';
import './ReferenceMaterialResultCard.css';

/**
 * @param {Object} props
 * @param {Object} props.referenceMaterial - Reference material data
 * @param {function} props.onReferenceUpdate - Callback for when reference material is updated
 */
export const ReferenceMaterialResultCard = ({ referenceMaterial, onReferenceUpdate }) => {
    const [isPowerSourcePopupOpen, setIsPowerSourcePopupOpen] = useState(false);
    const [isHolidayLightsPopupOpen, setIsHolidayLightsPopupOpen] = useState(false);
    const [isAddEditPopupOpen, setIsAddEditPopupOpen] = useState(false);
    const [currentReferenceMaterial] = useState(referenceMaterial);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleAddEditClick = () => {
        setIsAddEditPopupOpen(true);
    };

    const handlePowerSourceClick = () => {
        setIsPowerSourcePopupOpen(true);
    };

    const handleHolidayLightsClick = () => {
        setIsHolidayLightsPopupOpen(true);
    };

    // Format the complete address as a single line
    const formatAddress = (address) => {
        if (!address) return 'No address provided';
        return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
    };

    // Get general notes or show placeholder
    const getGeneralNotes = () => {
        return currentReferenceMaterial.generalNotes || 'No general notes available. Click the + button to add notes.';
    };

    const hasNotes = () => {
        return currentReferenceMaterial.generalNotes && currentReferenceMaterial.generalNotes.trim().length > 0;
    };

    return (
        <>
            <div className="reference-result-card">
                {/* Add/Edit Button */}
                <div className="reference-result-card-add-container">
                    <button
                        className="reference-result-card-add-button"
                        onClick={handleAddEditClick}
                        aria-label="Add or edit reference material"
                    >
                        <PlusIcon className="reference-result-card-add-icon" />
                    </button>
                </div>

                <div className="reference-result-card-content">
                    {/* Header */}
                    <div className="reference-result-card-header">
                        <div className="reference-result-card-header-info">
                            <HomeIcon className="reference-result-card-home-icon" />
                            <div>
                                <h3 className="reference-result-card-title">
                                    Home: {'Unknown Property'}
                                </h3>
                                <p className="reference-result-card-address">
                                    {"123 Main St, Springfield, IL 62701, USA"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* General Notes Section */}
                    <div className="reference-result-card-section">
                        <div className="reference-result-card-section-title">
                            <svg
                                className="reference-result-card-section-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                            General Notes
                        </div>
                        <div className={`reference-result-card-notes-text ${!hasNotes() ? 'empty' : ''}`}>
                            {getGeneralNotes()}
                        </div>
                    </div>

                    {/* Action Buttons Section */}
                    <div className="reference-result-card-section">
                        <div className="reference-result-card-actions">
                            {/* Power Source Location Button */}
                            <div className="reference-result-card-action-row">
                                <svg
                                    className="reference-result-card-section-icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                <button
                                    onClick={handlePowerSourceClick}
                                    className="reference-result-card-action-button reference-result-card-power-button"
                                    aria-label="View power source locations"
                                >
                                    <svg
                                        className="reference-result-card-action-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    <span className="reference-result-card-action-text">Power Source Location</span>
                                </button>
                            </div>

                            {/* Holiday Lights Button */}
                            <div className="reference-result-card-action-row">
                                <svg
                                    className="reference-result-card-section-icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                                <button
                                    onClick={handleHolidayLightsClick}
                                    className="reference-result-card-action-button reference-result-card-holiday-button"
                                    aria-label="View holiday lights information"
                                >
                                    <svg
                                        className="reference-result-card-action-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                    <span className="reference-result-card-action-text">Holiday Lights</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="reference-result-card-footer">
                        <CalenderIcon className="reference-result-card-footer-icon" />
                        <span className="reference-result-card-footer-text">
                            Last updated: {formatDate(currentReferenceMaterial.lastUpdated || new Date())}
                        </span>
                    </div>
                </div>
            </div>

            {/* Note: Popup components would be implemented separately */}
            {/* Add/Edit Popup */}
            {isAddEditPopupOpen && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    zIndex: 1000
                }}>
                    <p>Add/Edit Popup - Implementation pending</p>
                    <button onClick={() => setIsAddEditPopupOpen(false)}>Close</button>
                </div>
            )}

            {/* Power Source Popup */}
            {isPowerSourcePopupOpen && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    zIndex: 1000
                }}>
                    <p>Power Source Location Popup - Implementation pending</p>
                    <button onClick={() => setIsPowerSourcePopupOpen(false)}>Close</button>
                </div>
            )}

            {/* Holiday Lights Popup */}
            {isHolidayLightsPopupOpen && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    zIndex: 1000
                }}>
                    <p>Holiday Lights Popup - Implementation pending</p>
                    <button onClick={() => setIsHolidayLightsPopupOpen(false)}>Close</button>
                </div>
            )}
        </>
    );
};

export default ReferenceMaterialResultCard;