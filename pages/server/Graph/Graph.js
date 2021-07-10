import Styles from "../../../styles/Home.module.css";
import localStyles from "../../../styles/_Server.module.css";

export default function Graph() {
    const ServerName = "Cloudflare DNS";
    const LastUpdate = "14:23:01 Jul-09-2021";

    return (
        <div className={localStyles.graph}>
            <h1 className={Styles.graphTitle}>{ServerName}</h1>
            <h1 className={Styles.graphDate}>{LastUpdate}</h1>
        </div>
    );
}
