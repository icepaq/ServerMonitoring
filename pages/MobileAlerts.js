import Sidebar from "./sidebar/Sidebar.js";
import MobileAlerts from "./mobilealerts/MobileAlerts.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

export default function mobileAlerts() {
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
            <MobileAlerts />
        </div>
    );
}
