import { useState } from "react";
import Styles from "../../../../styles/Alerts.module.css";
import Information from "./information.js";
import Cookies from "universal-cookie";

export default function InformationRow() {
    const [Alerts, setAlerts] = useState("");
    const [Servers, setServers] = useState("");
    const [ServersDown, setServersDown] = useState("");

    const cookie = new Cookies();
    const key = cookie.get("logincookie");

    fetch("/api/OverviewAPI?key=" + key)
        .then((res) => res.json())
        .then((r) => {
            setAlerts(r.alerts);
            setServers(r.servers);
            setServersDown(r.down);
        });

    return (
        <div className={Styles.informationRow}>
            <Information number={Alerts} title="Alert" />
            <Information number={ServersDown} title="Server Down" />
            <Information number="6" title="High Latency" />
            <Information number="6" title="High Packetloss" />
        </div>
    );
}
