import Sidebar from "./sidebar/Sidebar.js";
import Keys from "./Keys/Keys.js";

export default function mobileAlerts() {
    return (
        <div className="wrapper">
            <Sidebar />
            <Keys />
        </div>
    );
}
