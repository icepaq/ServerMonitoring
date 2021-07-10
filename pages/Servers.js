import Sidebar from "./sidebar/Sidebar.js";
import Server from "./servers/Servers.js";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ServerPage() {
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
            <Server />
        </div>
    );
}
