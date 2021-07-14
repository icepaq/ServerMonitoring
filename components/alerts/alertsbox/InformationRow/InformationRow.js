import { useState } from "react";
import Styles from "../../../../styles/Alerts.module.css";
import Information from "./information.js";
import Cookies from "universal-cookie";

export default function InformationRow() {
    const [Alerts, setAlerts] = useState("");
    const [Servers, setServers] = useState("");
    const [ServersDown, setServersDown] = useState("");
    const [Latency, setLatency] = useState("");
    const [Packetloss, setPacketloss] = useState("");

    const cookie = new Cookies();
    const key = cookie.get("logincookie");
    const email = cookie.get("logincookieemail");

    fetch(
        "https://serverpanel.controlserverhosting.com/api/alertscount?email=" +
            email +
            "&key=" +
            key
    )
        .then((res) => res.json())
        .then((r) => {
            setLatency(r.latency);
            setPacketloss(r.packetloss);
            setServersDown(r.down);
            setAlerts(r.alerts);
        })
        .catch((err) => {
            console.log("Fetch Error");
        });

    return (
        <div className={Styles.informationRow}>
            <Information number={Alerts} title="Alert" />
            <Information number={ServersDown} title="Server Down" />
            <Information number={Latency} title="High Latency" />
            <Information number={Packetloss} title="High Packetloss" />
        </div>
    );
}
