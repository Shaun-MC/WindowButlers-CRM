import { useRoutes } from "react-router-dom";

import Login from "../components/login/loginpage.jsx";
import HomePage from "../components/homepage/homepage";
import ManageDataPage from "../components/features/manage-data/index2.jsx";
import ReferenceMaterialPage from "../components/features/reference-material/index.js";
import MetricsDashboardPage from "../components/features/metrics-dashboard/index.js";
import RouteJobsPage from "../components/features/route-jobs/index.js";
import ClientOutreachPage from "../components/features/client-outreach/index.js";
import AppointmentSchedulingPage from "../components/features/appt-scheduling/index.js";
import PaymentProcessingPage from "../components/features/payment-processing/index.js";
import SettingsPage from "../components/settings/index.js";
import AccountPage from "../components/account/index.js";

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
            element: <AccountPage />,
        },
    ];

    return useRoutes(routesArray);
};

export default AppRouter;
