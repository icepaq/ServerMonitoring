import Sidebar from "./sidebar/Sidebar.js";
import Overview from "./overview/overview.js";

export default function OverviewPage() {
    return (
        <div className="wrapper">
            <Sidebar />
            <Overview />
        </div>
    );
}
