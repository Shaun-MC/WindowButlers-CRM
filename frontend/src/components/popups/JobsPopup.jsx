import React, { useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/x.svg';
import { ReactComponent as BriefcaseIcon } from '../../icons/briefcase.svg';
import ModalBase from './ModalBase';
import { FormSection } from './forms/FormSection.jsx';
import './JobsPopup.css';

const JOBS_DATA = {
    "Shauna Cashman": [
        {
            title: "Window Cleaning",
            dateCompleted: "2024-09-24",
            laborHours: 2,
            notes: "Big windows, really annoying",
            difficulty: "Hard",
            isPaid: true
        },
        {
            title: "Holiday Lights (4)",
            dateCompleted: "2024-09-24",
            laborHours: 3,
            notes: "Bring a tall ladder",
            difficulty: "Medium",
            isPaid: true,
            colors: ["Cool White", "Red"]
        },
        {
            title: "Moss Removal",
            dateCompleted: "2024-09-24",
            laborHours: 1,
            notes: "",
            difficulty: "Very Easy",
            isPaid: true
        }
    ]
};

/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {import('../types/index.js').SearchResult} props.result
 */
export const JobsPopup = ({ isOpen, onClose, result }) => {
    // Get jobs for the specific person
    const getJobsForPerson = (name) => {
        return JOBS_DATA[name] || [];
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

    if (!isOpen) return null;

    const jobs = getJobsForPerson(result.name);
    const isHolidayLights = (title) => title.startsWith("Holiday Lights");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderJobCard = (job, index) => (
        <div key={index} className="job-card">
            <div className="job-header">
                <h3 className="job-title">{job.title}</h3>
                <span className={`job-status ${job.isPaid ? 'paid' : 'unpaid'}`}>
                    {job.isPaid ? 'Paid' : 'Unpaid'}
                </span>
            </div>

            <FormSection>
                <div className="job-details-grid">
                    <div className="job-detail-item">
                        <label className="job-detail-label">Date Completed</label>
                        <div className="job-detail-value">{formatDate(job.dateCompleted)}</div>
                    </div>

                    <div className="job-detail-item">
                        <label className="job-detail-label">Labor Hours</label>
                        <div className="job-detail-value">{job.laborHours} hours</div>
                    </div>

                    <div className="job-detail-item">
                        <label className="job-detail-label">Difficulty</label>
                        <div className={`job-detail-value difficulty-${job.difficulty.toLowerCase()}`}>
                            {job.difficulty}
                        </div>
                    </div>
                </div>

                <div className="job-detail-item job-notes">
                    <label className="job-detail-label">Notes</label>
                    <div className="job-detail-value job-notes-text">{job.notes}</div>
                </div>

                {isHolidayLights(job.title) && job.colors && (
                    <div className="job-detail-item">
                        <label className="job-detail-label">Colors</label>
                        <div className="job-colors">
                            {job.colors.map((color, colorIndex) => (
                                <span key={colorIndex} className="job-color-tag">
                                    {color}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </FormSection>
        </div>
    );

    return (
        <ModalBase
            isOpen={isOpen}
            onClose={onClose}
            title={`Jobs for ${result.name}`}
            className="jobs-modal"
        >
            <div className="jobs-popup-content">
                {jobs.length === 0 ? (
                    <div className="jobs-popup-empty">
                        <BriefcaseIcon className="jobs-popup-empty-icon" />
                        <h3 className="jobs-popup-empty-title">No Jobs Found</h3>
                        <p className="jobs-popup-empty-text">
                            There are currently no jobs associated with {result.name}.
                        </p>
                    </div>
                ) : (
                    <div className="jobs-list">
                        <div className="jobs-summary">
                            <span className="jobs-count">
                                {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
                            </span>
                        </div>
                        {jobs.map((job, index) => renderJobCard(job, index))}
                    </div>
                )}
            </div>
        </ModalBase>
    );
};

export default JobsPopup;