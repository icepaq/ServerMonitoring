import Sidebar from "./sidebar/Sidebar.js";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

import AddServer from "./addserver/AddServer.js";

export default function AddServerPage() {
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
            <AddServer />
        </div>
    );
}
