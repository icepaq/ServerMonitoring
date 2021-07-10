import Styles from "../../../styles/Settings.module.css";
import Column1 from "./Column1/Column1.js";
import Column2 from "./Column2/Column2.js";

export default function OverviewComponent() {
    return (
        <div className={Styles.columnWrapper}>
            <Column1 />
            <Column2 />
        </div>
    );
}
