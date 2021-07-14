import Sidebar from "../components/sidebar/Sidebar.js";
import Overview from "../components/overview/overview.js";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

export default function OverviewPage() {
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
            <Overview token={token} />
        </div>
    );
}
