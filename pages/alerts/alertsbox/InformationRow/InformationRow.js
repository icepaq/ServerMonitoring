import Styles from "../../../../styles/Alerts.module.css";
import Information from "./information.js";

export default function InformationRow() {
    return (
        <>
            <div className={Styles.informationRow}>
                <Information number="1" title="Alert" />
                <Information number="5" title="Server Down" />
                <Information number="6" title="High Latency" />
                <Information number="6" title="High Packetloss" />
            </div>
        </>
    );
}
