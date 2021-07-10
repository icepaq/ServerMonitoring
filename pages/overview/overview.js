import Styles from "../../styles/Home.module.css";
import Greeting from "../GeneralComponents/greeting.js";
import InformationRow from "./InformationRow/InformationRow.js";
import Graph from "./Graph/Graph.js";

export default function OverviewComponent(props) {
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
