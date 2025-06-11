import { lazy } from 'react';

// Lazy load components for better performance
const HomePage = lazy(() => import("../components/homepage/homepage"));
const ManageDataPage = lazy(() => import("../components/features/manage-data/index2.jsx"));
const ReferenceMaterialPage = lazy(() => import("../components/features/reference-material/index.js"));
const MetricsDashboardPage = lazy(() => import("../components/features/metrics-dashboard/index.js"));
const RouteJobsPage = lazy(() => import("../components/features/route-jobs/index.js"));
const ClientOutreachPage = lazy(() => import("../components/features/client-outreach/index.js"));
const AppointmentSchedulingPage = lazy(() => import("../components/features/appt-scheduling/index.js"));
const PaymentProcessingPage = lazy(() => import("../components/features/payment-processing/index.js"));
const SettingsPage = lazy(() => import("../components/settings/index.js"));
const AccountPage = lazy(() => import("../components/account/index.js"));

export const appRoutes = [
    {
        path: "/home",
        component: HomePage,
        title: "Home",
        icon: "home"
    },
    {
        path: "/manage-data",
        component: ManageDataPage,
        title: "Manage Data",
        icon: "database"
    },
    {
        path: "/reference-material",
        component: ReferenceMaterialPage,
        title: "Reference Material",
        icon: "book"
    },
    {
        path: "/metrics-dashboard",
        component: MetricsDashboardPage,
        title: "Metrics Dashboard",
        icon: "chart"
    },
    {
        path: "/route-jobs",
        component: RouteJobsPage,
        title: "Route Jobs",
        icon: "route"
    },
    {
        path: "/client-outreach",
        component: ClientOutreachPage,
        title: "Client Outreach",
        icon: "users"
    },
    {
        path: "/appointment-scheduling",
        component: AppointmentSchedulingPage,
        title: "Appointment Scheduling",
        icon: "calendar"
    },
    {
        path: "/payment-processing",
        component: PaymentProcessingPage,
        title: "Payment Processing",
        icon: "credit-card"
    },
    {
        path: "/settings",
        component: SettingsPage,
        title: "Settings",
        icon: "settings"
    },
    {
        path: "/account",
        component: AccountPage,
        title: "Account",
        icon: "user"
    }
];