import Styles from "../../../styles/Alerts.module.css";

export default function informationBox(props) {
    return (
        <div className={Styles.informationBox}>
            <h1 className={Styles.informationBoxNumber}>{props.number}</h1>
            <h1 className={Styles.informationBoxTitle}>{props.title}</h1>
        </div>
    );
}
