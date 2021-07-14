import Styles from "../../styles/Home.module.css";
import Greeting from "../GeneralComponents/greeting.js";
import Wrapper from "./Wrapper/Wrapper.js";

export default function OverviewComponent() {
    return (
        <div className={Styles.overviewComponent}>
            <Greeting />
            <Wrapper />
        </div>
    );
}
