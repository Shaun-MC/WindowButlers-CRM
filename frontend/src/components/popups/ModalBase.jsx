import React from 'react';
import { ReactComponent as CloseIcon } from '../../icons/x.svg';
import './AddDataModal.css';

const ModalBase = ({ isOpen, onClose, title, children, maxWidth = '600px' }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                className="modal-content"
                style={{ maxWidth }}
            >
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button
                        className="close-button"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <CloseIcon className="close-icon" />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalBase;