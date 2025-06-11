// frontend/src/components/search/ResultCard.jsx
import React, { useState, useEffect } from 'react';
import { ReactComponent as PinIcon } from '../../icons/map-pin.svg';
import { ReactComponent as MailIcon } from '../../icons/email.svg';
import { ReactComponent as PhoneIcon } from '../../icons/phone.svg';
import { ReactComponent as UserIcon } from '../../icons/person.svg';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import { ReactComponent as CalenderIcon } from '../../icons/calender.svg';
import { ReactComponent as EditIcon } from '../../icons/edit-pen.svg';
import { ReactComponent as CloseIcon } from '../../icons/x.svg';
import { ReactComponent as BriefcaseIcon } from '../../icons/briefcase.svg';
import './ResultCard.css';


/**
 * @param {Object} props
 * @param {import('../types/index.js').SearchResult} props.result
 */
export const ResultCard = ({ result }) => {
  const [isJobsPopupOpen, setIsJobsPopupOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeIcon = () => {
    return result.type === 'person' ? (
      <UserIcon className="result-card-type-icon result-card-type-icon--person" />
    ) : (
      <HomeIcon className="result-card-type-icon result-card-type-icon--home" />
    );
  };

  const handleEditClick = () => {
    // TODO: Implement edit functionality
    console.log('Edit clicked for:', result.id);
  };

  const handleJobsClick = () => {
    setIsJobsPopupOpen(true);
  };

  const handleJobsPopupClose = () => {
    setIsJobsPopupOpen(false);
  };

  // Format the complete address as a single line
  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
  };

  // Get job count (mock data for now)
  const getJobCount = () => {
    // TODO: Replace with actual job count from result data
    return Math.floor(Math.random() * 5); // 0-4 jobs
  };

  // Close popup on Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isJobsPopupOpen) {
        handleJobsPopupClose();
      }
    };

    if (isJobsPopupOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isJobsPopupOpen]);

  // Close popup when clicking overlay
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleJobsPopupClose();
    }
  };

  const jobCount = getJobCount();

  return (
    <>
      <div className="result-card">
        {/* Edit Icon */}
        <div className="result-card-edit-container">
          <button
            className="result-card-edit-button"
            onClick={handleEditClick}
            aria-label="Edit contact"
          >
            <EditIcon className="result-card-edit-icon" />
          </button>
        </div>

        <div className="result-card-content">
          <div className="result-card-header">
            <div className="result-card-header-info">
              {getTypeIcon()}
              <div>
                <h3 className="result-card-name">
                  {result.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="result-card-details">
            <div className="result-card-detail-row">
              <PinIcon className="result-card-detail-icon" />
              <div className="result-card-address">
                {formatAddress(result.address)}
              </div>
            </div>

            {result.email && (
              <div className="result-card-detail-row">
                <MailIcon className="result-card-detail-icon" />
                <a
                  href={`mailto:${result.email}`}
                  className="result-card-contact-link"
                >
                  {result.email}
                </a>
              </div>
            )}

            {result.phone && (
              <div className="result-card-detail-row">
                <PhoneIcon className="result-card-detail-icon" />
                <a
                  href={`tel:${result.phone}`}
                  className="result-card-contact-link"
                >
                  {result.phone}
                </a>
              </div>
            )}

            {/*obs Button aligned with other icons */}
            <div className="result-card-jobs-row">
              <BriefcaseIcon className="result-card-detail-icon" />
              <button
                onClick={handleJobsClick}
                className="result-card-jobs-button"
                aria-label={`View jobs for ${result.name}`}
              >
                <span className="result-card-jobs-text">Jobs</span>
              </button>
            </div>

            <div className="result-card-footer">
              <CalenderIcon className="result-card-footer-icon" />
              <span className="result-card-footer-text">
                Last updated: {formatDate(result.lastUpdated)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Popup */}
      {isJobsPopupOpen && (
        <div
          className={`result-card-jobs-popup-overlay ${isJobsPopupOpen ? 'active' : ''}`}
          onClick={handleOverlayClick}
        >
          <div className="result-card-jobs-popup">
            {/* Popup Header */}
            <div className="result-card-jobs-popup-header">
              <h2 className="result-card-jobs-popup-title">
                Jobs for {result.name}
              </h2>
              <button
                onClick={handleJobsPopupClose}
                className="result-card-jobs-popup-close"
                aria-label="Close jobs popup"
              >
                <CloseIcon className="result-card-jobs-popup-close-icon" />
              </button>
            </div>

            {/* Popup Content */}
            <div className="result-card-jobs-popup-content">
              {jobCount === 0 ? (
                <div className="result-card-jobs-popup-empty">
                  <BriefcaseIcon className="result-card-jobs-popup-empty-icon" />
                  <h3 className="result-card-jobs-popup-empty-title">No Jobs Found</h3>
                  <p className="result-card-jobs-popup-empty-text">
                    There are currently no jobs associated with {result.name}.
                  </p>
                </div>
              ) : (
                <div className="result-card-jobs-popup-empty">
                  <BriefcaseIcon className="result-card-jobs-popup-empty-icon" />
                  <h3 className="result-card-jobs-popup-empty-title">
                    {jobCount} Job{jobCount !== 1 ? 's' : ''} Found
                  </h3>
                  <p className="result-card-jobs-popup-empty-text">
                    Job details will be displayed here. This popup is ready for job data integration.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultCard;