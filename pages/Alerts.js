import Sidebar from "./sidebar/Sidebar.js";
import Alerts from "./alerts/Alerts.js";

export default function alerts() {
    return (
        <div className="wrapper">
            <Sidebar />
            <Alerts />
        </div>
    );
}
