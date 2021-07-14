import Styles from "../../../styles/Server.module.css";
import InputBox from "../../GeneralComponents/inputbox.js";
import Table from "./table.js";

export default function Box() {
    return (
        <div className={Styles.serverbox}>
            <InputBox />
            <Table />
        </div>
    );
}
