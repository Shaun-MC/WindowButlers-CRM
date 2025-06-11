import Login from "./components/login/loginpage.jsx";

import Header from "./components/header/heading.jsx";
import Footer from "./components/footer/footer.js";
import HomePage from "./components/homepage/homepage";
import ManageDataPage from "./components/features/manage-data/index2.jsx";
import ReferenceMaterialPage from "./components/features/reference-material/index.js";
import MetricsDashboardPage from "./components/features/metrics-dashboard/index.js";
import RouteJobsPage from "./components/features/route-jobs/index.js";
import ClientOutreachPage from "./components/features/client-outreach/index.js";
import AppointmentSchedulingPage from "./components/features/appt-scheduling/index.js";
import PaymentProcessingPage from "./components/features/payment-processing/index.js";
import SettingsPage from "./components/settings/index.js";
import AccountPage from "./components/account/index.js";

import { AuthProvider } from "./contexts/auth/index.jsx";
import { useRoutes } from "react-router-dom";

function App() {
    const routesArray = [
        {
            path: "*",
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
        }

    ];
    let routesElement = useRoutes(routesArray);
    return (
        <AuthProvider>
            <Header />
            <div className="w-full h-screen flex flex-col">{routesElement}</div>
            <Footer />
        </AuthProvider>
    );
}

export default App;
