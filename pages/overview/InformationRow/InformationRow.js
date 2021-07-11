import { useState } from "react";
import Styles from "../../../styles/Home.module.css";
import Information from "./information.js";

export default function InformationRow(props) {
    const [alerts, setAlerts] = useState("0");
    const [serversUp, setServersUp] = useState("0");
    const [servers, setServers] = useState("0");

    fetch("http://localhost:3000/api/OverviewAPI?key=" + props.token)
        .then((res) => res.json())
        .then((r) => {
            setAlerts(r.alerts);
            setServers(r.servers);
            setServersUp(r.down);
        });

    return (
        <div className={Styles.informationRow}>
            <Information number={alerts} title="Alerts" />
            <Information number={serversUp} title="Servers Down" />
            <Information number={servers} title="Total Servers" />
        </div>
    );
}
