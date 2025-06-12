// frontend/src/components/header/SideMenu.jsx
import React, { useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/x.svg';
import { ReactComponent as BurgerIcon } from '../../icons/burger.svg';
import { ReactComponent as AddDataIcon } from '../../icons/circle-plus.svg';
import { ReactComponent as ManageDataIcon } from '../../icons/account-settings.svg';
import { ReactComponent as ReferenceMaterialIcon } from '../../icons/gallery.svg';
import { ReactComponent as MetricsDashboardIcon } from '../../icons/metrics.svg';
import { ReactComponent as RouteJobsIcon } from '../../icons/route.svg';
import { ReactComponent as ClientOutreachIcon } from '../../icons/outreach.svg';
import { ReactComponent as AppointmentSchedulingIcon } from '../../icons/calender.svg';
import { ReactComponent as PaymentProcessingIcon } from '../../icons/payment.svg';
import { ReactComponent as ArrowIcon } from '../../icons/arrow-right.svg';
import './sidemenu.css';

const SideMenu = ({ isOpen, onClose, onToggle }) => {
    // Menu items configuration
    const menuItems = [
        {
            id: 'homepage',
            icon: () => (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
            ),
            title: 'Homepage',
            route: '/'
        },
        {
            id: 'add-data',
            icon: AddDataIcon,
            title: 'Add Data',
            route: '/add-data',
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
            {isOpen && (
                <div className={`side-menu-overlay active`} onClick={handleOverlayClick}>
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
                                            <item.icon className="side-menu-icon" />
                                        </div>
                                        <div className="side-menu-item-content">
                                            <h3 className="side-menu-item-title">{item.title}</h3>
                                        </div>
                                        <div className="side-menu-item-arrow">
                                            <ArrowIcon width={20} height={20} className="side-menu-arrow-icon" />
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SideMenu;