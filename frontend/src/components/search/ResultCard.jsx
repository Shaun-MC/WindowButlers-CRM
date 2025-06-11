// frontend/src/components/features/manage-data/components/ResultCard.jsx
import React, { useState } from 'react';
import { ReactComponent as PinIcon } from '../../icons/map-pin.svg';
import { ReactComponent as MailIcon } from '../../icons/email.svg';
import { ReactComponent as PhoneIcon } from '../../icons/phone.svg';
import { ReactComponent as UserIcon } from '../../icons/person.svg';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import { ReactComponent as CalenderIcon } from '../../icons/calender.svg';
import { ReactComponent as EditIcon } from '../../icons/edit-pen.svg';
import { ReactComponent as ChevronIcon } from '../../icons/chevron.svg';
import './ResultCard.css';

/**
 * @param {Object} props
 * @param {import('../types/index.js').SearchResult} props.result
 */
export const ResultCard = ({ result }) => {
  const [isJobsOpen, setIsJobsOpen] = useState(false);

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
      <HomeIcon className="result-card-type-icon result-card-type-icon--business" />
    );
  };

  const getTypeBadgeClass = () => {
    return result.type === 'person'
      ? 'result-card-type-badge result-card-type-badge--person'
      : 'result-card-type-badge result-card-type-badge--business';
  };

  const handleEditClick = () => {
    // TODO: Implement edit functionality
    console.log('Edit clicked for:', result.id);
  };

  const handleJobsToggle = () => {
    setIsJobsOpen(!isJobsOpen);
  };

  return (
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
              <span className={getTypeBadgeClass()}>
                {result.type === 'person' ? 'Person' : 'Business'}
              </span>
            </div>
          </div>
        </div>

        <div className="result-card-details">
          <div className="result-card-detail-row">
            <PinIcon className="result-card-detail-icon" />
            <div className="result-card-address">
              <p className="result-card-address-street">{result.address.street}</p>
              <p>
                {result.address.city}, {result.address.state} {result.address.zipCode}
              </p>
              <p>{result.address.country}</p>
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
            <div className="result-card-jobs">
              <div className="result-card-detail-row">
                <PhoneIcon className="result-card-detail-icon" />
                <a
                  href={`tel:${result.phone}`}
                  className="result-card-contact-link"
                >
                  {result.phone}
                </a>
              </div>

              {/* Jobs Dropdown */}
              <div className="result-card-jobs-container">
                <button
                  onClick={handleJobsToggle}
                  className="result-card-jobs-button"
                  aria-expanded={isJobsOpen}
                  aria-label="Toggle jobs list"
                >
                  <span className="result-card-jobs-text">Jobs</span>
                  <ChevronIcon
                    className={`result-card-jobs-chevron ${isJobsOpen ? 'result-card-jobs-chevron--open' : ''
                      }`}
                  />
                </button>

                {isJobsOpen && (
                  <div className="result-card-jobs-content">
                    <p className="result-card-jobs-empty">No jobs available</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="result-card-footer">
            <CalenderIcon className="result-card-footer-icon" />
            <span className="result-card-footer-text">
              Last updated: {formatDate(result.lastUpdated)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;