import Styles from "../../../styles/Server.module.css";
import InputBox from "./inputbox.js";
import AddServer from "./addserver.js";
import Table from "./table.js";

export default function ServerBox() {
    return (
        <div className={Styles.serverbox}>
            <InputBox />
            <AddServer />
            <Table />
        </div>
    );
}
