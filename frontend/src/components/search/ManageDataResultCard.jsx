// frontend/src/components/search/ResultCard.jsx
import React, { useState } from 'react';
import { ReactComponent as PinIcon } from '../../icons/map-pin.svg';
import { ReactComponent as MailIcon } from '../../icons/email.svg';
import { ReactComponent as PhoneIcon } from '../../icons/phone.svg';
import { ReactComponent as UserIcon } from '../../icons/person.svg';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import { ReactComponent as CalenderIcon } from '../../icons/calender.svg';
import { ReactComponent as EditIcon } from '../../icons/edit-pen.svg';
import { ReactComponent as BriefcaseIcon } from '../../icons/briefcase.svg';
import JobsPopup from '../popups/JobsPopup.jsx';
import EditPopup from '../popups/EditPopup.jsx';
import './ManageDataResultCard.css';

/**
 * @param {Object} props
 * @param {import('../types/index.js').SearchResult} props.result
 * @param {function} props.onResultUpdate - Callback for when result is updated
 */
export const ManageDataResultCard = ({ result, onResultUpdate }) => {
  const [isJobsPopupOpen, setIsJobsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState(result);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeIcon = () => {
    return currentResult.type === 'person' ? (
      <UserIcon className="result-card-type-icon result-card-type-icon--person" />
    ) : (
      <HomeIcon className="result-card-type-icon result-card-type-icon--home" />
    );
  };

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  const handleEditSave = (updatedResult) => {
    setCurrentResult(updatedResult);
    // Call parent callback if provided
    if (onResultUpdate) {
      onResultUpdate(updatedResult);
    }
    console.log('Result updated:', updatedResult);
  };

  const handleJobsClick = () => {
    setIsJobsPopupOpen(true);
  };

  // Format the complete address as a single line
  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
  };

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
                  {currentResult.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="result-card-details">
            <div className="result-card-detail-row">
              <PinIcon className="result-card-detail-icon" />
              <div className="result-card-address">
                {formatAddress(currentResult.address)}
              </div>
            </div>

            {currentResult.email && (
              <div className="result-card-detail-row">
                <MailIcon className="result-card-detail-icon" />
                <a
                  href={`mailto:${currentResult.email}`}
                  className="result-card-contact-link"
                >
                  {currentResult.email}
                </a>
              </div>
            )}

            {currentResult.phone && (
              <div className="result-card-detail-row">
                <PhoneIcon className="result-card-detail-icon" />
                <a
                  href={`tel:${currentResult.phone}`}
                  className="result-card-contact-link"
                >
                  {currentResult.phone}
                </a>
              </div>
            )}

            {/* Jobs Button aligned with other icons */}
            <div className="result-card-jobs-row">
              <BriefcaseIcon className="result-card-detail-icon" />
              <button
                onClick={handleJobsClick}
                className="result-card-jobs-button"
                aria-label={`View jobs for ${currentResult.name}`}
              >
                <span className="result-card-jobs-text">Jobs</span>
              </button>
            </div>

            <div className="result-card-footer">
              <CalenderIcon className="result-card-footer-icon" />
              <span className="result-card-footer-text">
                Last updated: {formatDate(currentResult.lastUpdated)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Popup */}
      <JobsPopup
        isOpen={isJobsPopupOpen}
        onClose={() => setIsJobsPopupOpen(false)}
        result={currentResult}
      />

      {/* Edit Popup */}
      <EditPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onSave={handleEditSave}
        result={currentResult}
      />
    </>
  );
};

export default ManageDataResultCard;