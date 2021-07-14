import Styles from "../../styles/Home.module.css";
import Greeting from "../GeneralComponents/greeting.js";
import InformationRow from "./InformationRow/InformationRow.js";
import Graph from "./Graph/Graph.js";
import { useState } from "react";

export default function OverviewComponent(props) {
    const [ServerName, setServerName] = useState("Loading...");

    return (
        <div className={Styles.overviewComponent}>
            <Greeting />
            <InformationRow token={props.token} />
            <div className="graphWrapper">
                <Graph token={props.token} />
            </div>
        </div>
    );
}
