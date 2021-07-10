import Sidebar from "./sidebar/Sidebar.js";
import Server from "./servers/Servers.js";

export default function ServerPage() {
    return (
        <div className="wrapper">
            <Sidebar />
            <Server />
        </div>
    );
}
