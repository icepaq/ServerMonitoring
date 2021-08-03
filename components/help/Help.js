import Styles from "../../styles/Home.module.css";
import Greeting from "../GeneralComponents/greeting.js";
import AlertsBox from "./alertsbox/HelpBox.js";

export default function index() {
    return (
        <div className={Styles.overviewComponent}>
            <Greeting />
            <AlertsBox />
        </div>
    );
}
