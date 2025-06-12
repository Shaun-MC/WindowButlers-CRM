import { useRoutes } from "react-router-dom";

import Login from "../components/login/loginpage.jsx";
import HomePage from "../components/homepage/homepage";
import AddDataPage from "../components/pages/AddDataPage.jsx";
import ManageDataPage from "../components/pages/ManageDataPage.jsx";
import ReferenceMaterialPage from "../components/pages/ReferenceMaterialPage.jsx";
import MetricsDashboardPage from "../components/pages/MetricsDashboardPage.jsx";
import RouteJobsPage from "../components/pages/RouteJobsPage.jsx";
import ClientOutreachPage from "../components/pages/RouteJobsPage.jsx";
import AppointmentSchedulingPage from "../components/pages/AppointmentSchedulingPage.jsx";
import PaymentProcessingPage from "../components/pages/PaymentProcessingPage.jsx";
import SettingsPage from "../components/pages/SettingsPage.jsx";
import AccountDetailsPage from "../components/pages/AccountDetailsPage.jsx";

const AppRouter = () => {
    const routesArray = [
        {
            path: "*",
            element: <Login />,
        },
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/home",
            element: <HomePage />,
        },
        {
            path: "/add-data",
            element: <AddDataPage />,
        },
        {
            path: "/manage-data",
            element: <ManageDataPage />,
        },
        {
            path: "/reference-material",
            element: <ReferenceMaterialPage />,
        },
        {
            path: "/metrics-dashboard",
            element: <MetricsDashboardPage />,
        },
        {
            path: "/route-jobs",
            element: <RouteJobsPage />,
        },
        {
            path: "/client-outreach",
            element: <ClientOutreachPage />,
        },
        {
            path: "/appointment-scheduling",
            element: <AppointmentSchedulingPage />,
        },
        {
            path: "/payment-processing",
            element: <PaymentProcessingPage />,
        },
        {
            path: "/settings",
            element: <SettingsPage />,
        },
        {
            path: "/account",
            element: <AccountDetailsPage />,
        },
    ];

    return useRoutes(routesArray);
};

export default AppRouter;
