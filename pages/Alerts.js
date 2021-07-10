import Sidebar from "./sidebar/Sidebar.js";
import Alerts from "./alerts/Alerts.js";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function alerts() {
    const cookie = new Cookies();
    const token = cookie.get("logincookie");
    const router = useRouter();

    if (token == undefined || token == "ERROR") {
        useEffect(() => {
            router.push("/Login");
        });
    }

    return (
        <div className="wrapper">
            <Sidebar />
            <Alerts />
        </div>
    );
}
