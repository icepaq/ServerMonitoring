import Styles from "../../../styles/Alerts.module.css";
import localStyles from "../../../styles/_Server.module.css";
import Information from "./information.js";

export default function InformationRow() {
    return (
        <>
            <div className={localStyles.informationRow}>
                <Information number="1ms" title="Latency" />
                <Information number="0%" title="Packetloss" />
                <Information number="23%" title="CPU Usage" />
                <Information number="13%" title="RAM Usage" />
            </div>
        </>
    );
}
