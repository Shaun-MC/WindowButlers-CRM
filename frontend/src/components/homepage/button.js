// Button.js - Separate Button class file
import { ReactComponent as AddDataIcon } from '../../icons/circle-plus.svg';
import { ReactComponent as ManageDataIcon } from '../../icons/account-settings.svg';
import { ReactComponent as ReferenceMaterialIcon } from '../../icons/reference-material.svg';
import { ReactComponent as MetricsDashboardIcon } from '../../icons/metrics.svg';
import { ReactComponent as RouteJobsIcon } from '../../icons/route.svg';
import { ReactComponent as ClientOutreachIcon } from '../../icons/outreach.svg';
import { ReactComponent as AppointmentSchedulingIcon } from '../../icons/calender.svg';
import { ReactComponent as PaymentProcessingIcon } from '../../icons/payment.svg';

class Button {
    constructor(id, icon, text) {
        this.id = id;
        this.icon = icon; // SVG path data
        this.text = text;
    }

    // Method to get route based on button ID
    getRoute() {
        const routes = {
            1: "/add-data",
            2: "/manage-data",
            3: "/reference-material",
            4: "/metrics-dashboard",
            5: "/route-jobs",
            6: "/client-outreach",
            7: "/appointment-scheduling",
            8: "/payment-processing",
        };
        return routes[this.id] || "/";
    }

    // Method to handle button click/tap
    handleClick() {
        window.location.href = this.getRoute();
    }

    renderIcon(props = {}) {
        const IconComponent = this.icon;
        return IconComponent ? <IconComponent {...props} /> : null;
    }

    // Static method to create all buttons
    static createAllButtons() {
        return [
            new Button(1, AddDataIcon, "Add Data"),
            new Button(2, ManageDataIcon, "Manage Data"),
            new Button(3, ReferenceMaterialIcon, "Reference Material"),
            new Button(4, MetricsDashboardIcon, "Metrics Dashboard"),
            new Button(5, RouteJobsIcon, "Route-Jobs"),
            new Button(6, ClientOutreachIcon, "Client Outreach"),
            new Button(7, AppointmentSchedulingIcon, "Appointment Scheduling"),
            new Button(8, PaymentProcessingIcon, "Payment Processing"),
        ];
    }
}

export default Button;
