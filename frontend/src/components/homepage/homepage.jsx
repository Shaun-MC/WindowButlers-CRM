import React, { useState } from 'react';
import Button from './button.js';
import '../../App.css';

const HomePage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [buttons] = useState(() => Button.createAllButtons());


    const handleButtonInteraction = (button, event) => {
        event.preventDefault();
        button.handleClick();
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-menu')) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (

        <main className="main-content">
            <div className="welcome-section">
                <h1 className="welcome-title">Welcome Back</h1>
            </div>

            <div className="button-grid">
                {buttons.map((button) => (
                    <button
                        key={button.id}
                        className={`grid-button`}
                        onClick={(e) => handleButtonInteraction(button, e)}
                        onTouchEnd={(e) => handleButtonInteraction(button, e)}
                        style={{ touchAction: 'manipulation' }} // Prevents double-tap zoom
                    >
                        {button.renderIcon({ className: "button-icon", width: 24, height: 24 })}
                        <span className="button-text">{button.text}</span>
                    </button>
                ))}
            </div>
        </main>
    );
};

export default HomePage;