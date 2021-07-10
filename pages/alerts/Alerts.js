import Styles from "../../styles/Home.module.css";
import Greeting from "../GeneralComponents/greeting.js";
import InputBox from "../GeneralComponents/inputbox.js";
import AlertsBox from "./alertsbox/AlertsBox.js";

export default function index() {
    return (
        <div className={Styles.overviewComponent}>
            <Greeting />
            <AlertsBox />
        </div>
    );
}
