import React, { useState } from 'react';
import { ReactComponent as AddDataIcon } from '../../icons/circle-plus.svg';
import AddDataModal from '../popups/AddDataModal.jsx';
import './AddDataPage.css';

const AddDataPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddDataClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="add-data-page">
            <h1 className="page-title">Add New Client Data & Business Assets</h1>

            <button className="add-data-button" onClick={handleAddDataClick}>
                <AddDataIcon className="add-data-button-icon" width={24} height={24} />
                <span className="add-data-button-text">Add Data</span>
            </button>

            {isModalOpen && (
                <AddDataModal onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default AddDataPage;