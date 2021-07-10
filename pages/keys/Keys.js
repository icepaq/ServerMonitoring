import Styles from "../../styles/Home.module.css";
import Greeting from "../GeneralComponents/greeting.js";
import Box from "./box/Box.js";

export default function keys() {
    return (
        <div className={Styles.overviewComponent}>
            <Greeting />
            <Box />
        </div>
    );
}
