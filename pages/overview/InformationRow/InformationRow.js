import Styles from "../../../styles/Home.module.css";
import Information from "./information.js";

export default function InformationRow() {
    return (
        <>
            <div className={Styles.informationRow}>
                <Information number="1" title="Alert" />
                <Information number="5" title="Servers Up" />
                <Information number="6" title="Total Servers" />
            </div>
            <div className="clear"></div>
        </>
    );
}
