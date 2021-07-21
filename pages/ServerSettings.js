import Sidebar from "../components/sidebar/Sidebar.js";
import Settings from "../components/serversettings/Settings.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

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
        <div>
            <Sidebar />
            <Settings />
        </div>
    );
}
