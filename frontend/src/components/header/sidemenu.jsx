// frontend/src/components/header/SideMenu.jsx
import React, { useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/x.svg';
import { ReactComponent as BurgerIcon } from '../../icons/burger.svg';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import { ReactComponent as ManageDataIcon } from '../../icons/account-settings.svg';
import { ReactComponent as ReferenceMaterialIcon } from '../../icons/reference-material.svg';
import { ReactComponent as MetricsDashboardIcon } from '../../icons/metrics.svg';
import { ReactComponent as RouteJobsIcon } from '../../icons/route.svg';
import { ReactComponent as ClientOutreachIcon } from '../../icons/outreach.svg';
import { ReactComponent as AppointmentSchedulingIcon } from '../../icons/calender.svg';
import { ReactComponent as PaymentProcessingIcon } from '../../icons/payment.svg';
import './sidemenu.css';

const SideMenu = ({ isOpen, onClose, onToggle }) => {
    // Menu items configuration
    const menuItems = [
        {
            id: 'homepage',
            icon: HomeIcon,
            title: 'Homepage',
            route: '/'
        },
        {
            id: 'manage-data',
            icon: ManageDataIcon,
            title: 'Manage Data',
            route: '/manage-data'
        },
        {
            id: 'reference-material',
            icon: ReferenceMaterialIcon,
            title: 'Reference Material',
            route: '/reference-material'
        },
        {
            id: 'metrics-dashboard',
            icon: MetricsDashboardIcon,
            title: 'Metrics Dashboard',
            route: '/metrics-dashboard'
        },
        {
            id: 'route-jobs',
            icon: RouteJobsIcon,
            title: 'Route Jobs',
            route: '/route-jobs'
        },
        {
            id: 'client-outreach',
            icon: ClientOutreachIcon,
            title: 'Client Outreach',
            route: '/client-outreach'
        },
        {
            id: 'appointment-scheduling',
            icon: AppointmentSchedulingIcon,
            title: 'Appointment Scheduling',
            route: '/appointment-scheduling'
        },
        {
            id: 'payment-processing',
            icon: PaymentProcessingIcon,
            title: 'Payment Processing',
            route: '/payment-processing'
        }
    ];

    // Handle menu item click
    const handleMenuItemClick = (route) => {
        window.location.href = route;
        onClose();
    };

    // Close menu on Escape key
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Close menu when clicking overlay
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Menu Toggle Button */}
            <button
                className="menu-icon"
                onClick={onToggle}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
            >
                <BurgerIcon className="menu-icon-svg" />
            </button>

            {/* Side Menu Overlay and Panel */}
            <div className={`side-menu-overlay ${isOpen ? 'active' : ''}`} onClick={handleOverlayClick}>
                <div className="side-menu">
                    {/* Header */}
                    <div className="side-menu-header">
                        <h2 className="side-menu-title">Menu</h2>
                        <button
                            onClick={onClose}
                            className="side-menu-close"
                            aria-label="Close menu"
                        >
                            <CloseIcon className="side-menu-close-icon" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="side-menu-content">
                        <nav className="side-menu-nav">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleMenuItemClick(item.route)}
                                    className="side-menu-item"
                                    aria-label={`Navigate to ${item.title}`}
                                >
                                    <div className="side-menu-item-icon">
                                        {typeof item.icon === 'function' ?
                                            <item.icon className="side-menu-icon" /> :
                                            <item.icon className="side-menu-icon" />
                                        }
                                    </div>
                                    <div className="side-menu-item-content">
                                        <h3 className="side-menu-item-title">{item.title}</h3>
                                        <p className="side-menu-item-description">{item.description}</p>
                                    </div>
                                    <div className="side-menu-item-arrow">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </div>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </>

    );
};

// Export both the SideMenu component and a separate MenuIcon component for flexibility
export const MenuIcon = ({ isOpen, onClick }) => (
    <button
        className="menu-icon"
        onClick={onClick}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
    >
        <BurgerIcon className="menu-icon-svg" />
    </button>
);

export default SideMenu;