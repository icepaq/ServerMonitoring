import Styles from "../../../styles/ToggleAlerts.module.css";

export default function ServerBox() {
    let alerts = "Alerts On";
    return (
        <div className={Styles.toggleAlerts}>
            <h1 className={Styles.Alerts}>{alerts}</h1>
            <div className={Styles.button}>Toggle Alerts</div>
        </div>
    );
}
