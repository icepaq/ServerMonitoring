import Styles from "../../styles/Home.module.css";
import Greeting from "../GeneralComponents/greeting.js";
import ServerBox from "./serverbox/ServerBox.js";

export default function ServerPage() {
    return (
        <div className={Styles.overviewComponent}>
            <Greeting />
            <ServerBox />
        </div>
    );
}
