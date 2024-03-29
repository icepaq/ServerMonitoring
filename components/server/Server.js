import Styles from "../../styles/Home.module.css";
import localStyles from "../../styles/_Server.module.css";
import Greeting from "../GeneralComponents/greeting.js";
import InformationRow from "./InformationRow/InformationRow.js";
import Graph from "./Graph/Graph.js";

export default function OverviewComponent() {
    return (
        <div className={localStyles.background}>
            <Greeting />
            <InformationRow />
            <div className={localStyles.graphWrapper}>
                <Graph />
            </div>
        </div>
    );
}
