import Styles from "../../styles/Home.module.css";
import Greeting from "./greeting.js";
import InformationRow from "./InformationRow/InformationRow.js";
import Graph from "./Graph/Graph.js";

export default function OverviewComponent() {
    return (
        <div className={Styles.overviewComponent}>
            <Greeting />
            <InformationRow />
            <div className="graphWrapper">
                <Graph />
            </div>
        </div>
    );
}
