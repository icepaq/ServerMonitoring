import Styles from "../../../styles/Server.module.css";
import localStyles from "../../../styles/ToggleAlerts.module.css";

export default function table() {
    let on = "On";
    let tableData = (
        <tr>
            <td className={Styles.tableData}>Sample</td>
            <td className={Styles.tableData}>1.2.3.4</td>
            <td className={Styles.tableData}>
                <div className={localStyles.button}>{on}</div>
            </td>
        </tr>
    );
    return (
        <table className={Styles.table}>
            <th className={Styles.nameHeader}>Name</th>
            <th className={Styles.IPHeader}>IP Address</th>
            <th className={Styles.alertsHeader}>Toggle Alert</th>
            {tableData}
        </table>
    );
}
