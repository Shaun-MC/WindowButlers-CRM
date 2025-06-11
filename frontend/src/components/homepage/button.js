// Button.js - Separate Button class file
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
            1: "/manage-data",
            2: "/reference-material",
            3: "/metrics-dashboard",
            4: "/route-jobs",
            5: "/client-outreach",
            6: "/appointment-scheduling",
            7: "/payment-processing",
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
            new Button(
                1,
                ManageDataIcon,
                "Manage Data"
            ),
            new Button(
                2,
                ReferenceMaterialIcon,
                "Reference Material"
            ),
            new Button(
                3,
                MetricsDashboardIcon,
                "Metrics Dashboard"
            ),
            new Button(
                4,
                RouteJobsIcon,
                "Route-Jobs",
            ),
            new Button(
                5, 
                ClientOutreachIcon,
                "Client Outreach"
            ),
            new Button(
                6, 
                AppointmentSchedulingIcon,
                "Appointment Scheduling"
            ),
            new Button(
                7,
                PaymentProcessingIcon,
                "Payment Processing"
            ),
        ];
    }
}

export default Button;
