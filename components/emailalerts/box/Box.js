import Styles from "../../../styles/Server.module.css";
import InputBox from "../../GeneralComponents/inputbox.js";
import ToggleAlerts from "./ToggelAlerts.js";
import Table from "./table.js";

export default function ServerBox() {
    return (
        <div className={Styles.serverbox}>
            <InputBox />
            <Table />
        </div>
    );
}
