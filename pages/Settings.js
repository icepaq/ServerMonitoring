import Sidebar from "./sidebar/Sidebar.js";
import Settings from "./settings/Settings.js";
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
        <div>
            <Sidebar />
            <Settings />
        </div>
    );
}
