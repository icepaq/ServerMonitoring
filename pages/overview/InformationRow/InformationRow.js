import { useState } from "react";
import Styles from "../../../styles/Home.module.css";
import Information from "./information.js";

export default function InformationRow(props) {
    const [alerts, setAlerts] = useState("0");
    const [serversUp, setServersUp] = useState("0");
    const [servers, setServers] = useState("0");

    fetch("http://localhost/api/OverviewAPI?key=" + props.token)
        .then((res) => res.json())
        .then((r) => {
            setAlerts(r.alerts);
            setServers(r.servers);
            setServersUp(r.down);
        })
        .catch((err) => {
            console.log("Fetch Error");
        });

    return (
        <div className={Styles.informationRow}>
            <Information number={alerts} title="Alerts" Link="/Alerts" />
            <Information
                number={serversUp}
                title="Servers Down"
                Link="/Alerts"
            />
            <Information
                number={servers}
                title="Total Servers"
                Link="/Servers"
            />
        </div>
    );
}
