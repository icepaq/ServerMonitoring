import Sidebar from "./sidebar/Sidebar.js";
import Overview from "./overview/overview.js";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

export default function OverviewPage() {
    const cookie = new Cookies();
    const token = cookie.get("logincookie");
    const router = useRouter();

    console.log("Overview");

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
