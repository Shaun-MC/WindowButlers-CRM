import React, { useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/x.svg';
import { ReactComponent as BriefcaseIcon } from '../../icons/briefcase.svg';
import './JobsPopup.css';

/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {import('../types/index.js').SearchResult} props.result
 */
export const JobsPopup = ({ isOpen, onClose, result }) => {
    // Get job count (mock data for now)
    const getJobCount = () => {
        // TODO: Replace with actual job count from result data
        return Math.floor(Math.random() * 5); // 0-4 jobs
    };

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

    if (!isOpen) return null;

    const jobCount = getJobCount();

    return (
        <div
            className={`jobs-popup-overlay ${isOpen ? 'active' : ''}`}
            onClick={handleOverlayClick}
        >
            <div className="jobs-popup">
                {/* Popup Header */}
                <div className="jobs-popup-header">
                    <h2 className="jobs-popup-title">
                        Jobs for {result.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="jobs-popup-close"
                        aria-label="Close jobs popup"
                    >
                        <CloseIcon className="jobs-popup-close-icon" />
                    </button>
                </div>

                {/* Popup Content */}
                <div className="jobs-popup-content">
                    {jobCount === 0 ? (
                        <div className="jobs-popup-empty">
                            <BriefcaseIcon className="jobs-popup-empty-icon" />
                            <h3 className="jobs-popup-empty-title">No Jobs Found</h3>
                            <p className="jobs-popup-empty-text">
                                There are currently no jobs associated with {result.name}.
                            </p>
                        </div>
                    ) : (
                        <div className="jobs-popup-empty">
                            <BriefcaseIcon className="jobs-popup-empty-icon" />
                            <h3 className="jobs-popup-empty-title">
                                {jobCount} Job{jobCount !== 1 ? 's' : ''} Found
                            </h3>
                            <p className="jobs-popup-empty-text">
                                Job details will be displayed here. This popup is ready for job data integration.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobsPopup;