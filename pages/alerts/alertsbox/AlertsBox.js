import Styles from "../../../styles/Alerts.module.css";
import InputBox from "../../GeneralComponents/inputbox.js";
import ToggleAlerts from "./toggleAlerts.js";
import Table from "./table.js";
import InformationRow from "./InformationRow/InformationRow.js";

export default function alertsbox() {
    return (
        <div className={Styles.alertsBox}>
            <InformationRow />
            <InputBox />
            <Table />
        </div>
    );
}
