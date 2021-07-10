import Sidebar from "./sidebar/Sidebar.js";
import MobileAlerts from "./mobilealerts/MobileAlerts.js";

export default function mobileAlerts() {
    return (
        <div className="wrapper">
            <Sidebar />
            <MobileAlerts />
        </div>
    );
}
