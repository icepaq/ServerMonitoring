import Sidebar from "../components/sidebar/Sidebar.js";
import Alerts from "../components/alerts/Alerts.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

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
