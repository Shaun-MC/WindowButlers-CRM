// frontend/src/components/header/header.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth/index.jsx';
import logo from "../../logo.avif";
import DropdownMenu from './dropdownmenu.jsx';
import SideMenu from './sidemenu.jsx';
import './header.css';

const Header = () => {
    const { userLoggedIn } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        // Close side menu if it's open
        if (isSideMenuOpen) {
            setIsSideMenuOpen(false);
        }
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
        // Close dropdown if it's open
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        }
    };

    const closeSideMenu = () => {
        setIsSideMenuOpen(false);
    };

    return (
        <>
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

                        {/* Right side - Menu Icons (only show when logged in) */}
                        {userLoggedIn && (
                            <div className="header-menu-section">
                                <div className="user-menu-container">
                                    <DropdownMenu
                                        isOpen={isDropdownOpen}
                                        onToggle={toggleDropdown}
                                        onClose={closeDropdown}
                                    />
                                </div>

                                {/* Side Menu (includes its own menu icon) */}
                                <SideMenu
                                    isOpen={isSideMenuOpen}
                                    onClose={closeSideMenu}
                                    onToggle={toggleSideMenu}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;