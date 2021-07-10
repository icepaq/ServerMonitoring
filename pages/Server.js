import Sidebar from "./sidebar/Sidebar.js";
import Server from "./server/Server.js";

export default function ServerPage() {
    return (
        <div className="wrapper">
            <Sidebar />
            <Server />
        </div>
    );
}
