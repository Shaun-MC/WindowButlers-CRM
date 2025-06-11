// Navigation utility functions for HomePage component

/**
 * Navigation routes configuration
 * Maps button IDs to their respective page routes
 */
/*
export const ROUTES = {
    1: "/dashboard",
    2: "/analytics",
    3: "/reports",
    4: "/main", // Center button - main feature
    5: "/tools",
    6: "/settings",
    7: "/help",
};

/**
 * Additional routes for header navigation

export const HEADER_ROUTES = {
    SETTINGS: "/settings",
    ACCOUNT: "/account",
    HOME: "/",
};

/**
 * Navigate to a specific route
 * @param {string} route - The route to navigate to
 * @param {boolean} newTab - Whether to open in new tab (default: false)

export const navigateTo = (route, newTab = false) => {
    if (newTab) {
        window.open(route, "_blank");
    } else {
        window.location.href = route;
    }
};

/**
 * Handle button navigation based on button ID
 * @param {number} buttonId - The ID of the clicked button
 * @param {boolean} newTab - Whether to open in new tab (default: false)
export const handleButtonNavigation = (buttonId, newTab = false) => {
    const route = ROUTES[buttonId];
    if (route) {
        navigateTo(route, newTab);
    } else {
        console.warn(`No route found for button ID: ${buttonId}`);
        navigateTo(HEADER_ROUTES.HOME);
    }
};

/**
 * Handle settings navigation
 * @param {boolean} newTab - Whether to open in new tab (default: false)
export const handleSettingsNavigation = (newTab = false) => {
    navigateTo(HEADER_ROUTES.SETTINGS, newTab);
};

/**
 * Handle account details navigation
 * @param {boolean} newTab - Whether to open in new tab (default: false)
export const handleAccountNavigation = (newTab = false) => {
    navigateTo(HEADER_ROUTES.ACCOUNT, newTab);
};

/**
 * Get route description for a button ID
 * @param {number} buttonId - The button ID
 * @returns {string} - Description of where the button leads
export const getRouteDescription = (buttonId) => {
    const descriptions = {
        1: "Dashboard - Overview and metrics",
        2: "Analytics - Data analysis and reports",
        3: "Reports - Generated reports and summaries",
        4: "Main - Primary application features",
        5: "Tools - Utility tools and resources",
        6: "Settings - Application preferences",
        7: "Help - Support and documentation",
    };

    return descriptions[buttonId] || "Unknown destination";
};

/**
 * Check if a route is valid
 * @param {string} route - The route to validate
 * @returns {boolean} - Whether the route is valid
export const isValidRoute = (route) => {
    const allRoutes = [...Object.values(ROUTES), ...Object.values(HEADER_ROUTES)];
    return allRoutes.includes(route);
};

/**
 * Get current page from URL
 * @returns {string} - Current page path
export const getCurrentPage = () => {
    return window.location.pathname;
};

/**
 * Check if user is on homepage
 * @returns {boolean} - Whether current page is homepage
export const isHomePage = () => {
    const currentPage = getCurrentPage();
    return currentPage === "/" || currentPage === "/home";
};

/**
 * Handle browser back navigation
export const goBack = () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        navigateTo(HEADER_ROUTES.HOME);
    }
};

/**
 * Handle page refresh
export const refreshPage = () => {
    window.location.reload();
};

/**
 * Navigation event handlers for better organization
export const NavigationHandlers = {
    // Button navigation handlers
    button1: () => handleButtonNavigation(1),
    button2: () => handleButtonNavigation(2),
    button3: () => handleButtonNavigation(3),
    button4: () => handleButtonNavigation(4), // Center/Main button
    button5: () => handleButtonNavigation(5),
    button6: () => handleButtonNavigation(6),
    button7: () => handleButtonNavigation(7),

    // Header navigation handlers
    settings: () => handleSettingsNavigation(),
    account: () => handleAccountNavigation(),
    home: () => navigateTo(HEADER_ROUTES.HOME),

    // Utility handlers
    back: goBack,
    refresh: refreshPage,
};

// Export default object with all utilities
export default {
    ROUTES,
    HEADER_ROUTES,
    navigateTo,
    handleButtonNavigation,
    handleSettingsNavigation,
    handleAccountNavigation,
    getRouteDescription,
    isValidRoute,
    getCurrentPage,
    isHomePage,
    goBack,
    refreshPage,
    NavigationHandlers,
};*/
