import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth.js';
import { useAuth } from '../../contexts/auth/index.jsx';
import { ReactComponent as LogoutIcon } from '../../icons/logout.svg';
import { ReactComponent as SettingsIcon } from '../../icons/settings.svg'
import { ReactComponent as PersonIcon } from '../../icons/person.svg';

import './dropdownmenu.css';

// Custom hook to create menu items with logout functionality
const useDropdownMenu = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const menuItems = [
        {
            id: 'logout',
            text: 'Logout',
            icon: LogoutIcon,
            action: () => {
                if (userLoggedIn) {
                    doSignOut().then(() => {
                        navigate('/login');
                    }).catch((error) => {
                        console.error('Logout error:', error);
                    });
                }
            }
        },
        {
            id: 'settings',
            text: 'Settings',
            icon: SettingsIcon,
            action: () => window.location.href = '/settings'
        },
        {
            id: 'account',
            text: 'Account Details',
            icon: PersonIcon,
            action: () => window.location.href = '/account'
        }
    ];

    return { menuItems };
};

// React functional component for the dropdown UI
const DropdownMenu = ({ isOpen, onToggle, onClose }) => {
    const { menuItems } = useDropdownMenu();

    // Handle item click with proper touch support
    const handleItemClick = (item, event) => {
        event.preventDefault();
        item.action();
        onClose();
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-menu')) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className="user-menu">
            <button
                className="user-icon"
                onClick={onToggle}
                onTouchEnd={(e) => {
                    e.preventDefault();
                    onToggle();
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            </button>
            <div className={`dropdown ${isOpen ? 'active' : ''}`}>
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className="dropdown-item"
                        onClick={(e) => handleItemClick(item, e)}
                        onTouchEnd={(e) => handleItemClick(item, e)}
                    >
                        <item.icon width={16} height={16} />
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DropdownMenu;