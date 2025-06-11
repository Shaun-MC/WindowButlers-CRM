import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth/index.jsx';
import logo from "../../logo.avif";
import DropdownMenu from './dropdownmenu.jsx';
import './header.css';

const Header = () => {
    const { userLoggedIn } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-content">
                    {/* Left side - Logo and Brand Text */}
                    <div className="brand-section">
                        {/* Logo */}
                        <div className="logo-container">
                            <img
                                src={logo}
                                alt="Window Butlers Logo"
                                className="logo"
                            />
                        </div>
                        
                        {/* Brand Text */}
                        <div className="brand-text">
                            <h1 className="brand-title">
                                WINDOW BUTLERS
                            </h1>
                            <p className="brand-subtitle">More than window cleaning.</p>
                        </div>
                    </div>

                    {/* Right side - Dropdown Menu (only show when logged in) */}
                    {userLoggedIn && (
                        <div className="user-menu-container">
                            <DropdownMenu
                                isOpen={isDropdownOpen}
                                onToggle={toggleDropdown}
                                onClose={closeDropdown}
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
