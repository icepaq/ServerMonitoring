import Styles from "../../../styles/Alerts.module.css";

export default function alertsbox() {
    let AlertsOn = "Alerts On";
    return (
        <div className={Styles.ToggleAlertsWrapper}>
            <h1 className={Styles.alertsOn}>{AlertsOn}</h1>
            <div className={Styles.button}>Toggle Alerts</div>
        </div>
    );
}
