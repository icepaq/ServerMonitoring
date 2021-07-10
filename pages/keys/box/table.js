import Styles from "../../../styles/Server.module.css";
import localStyles from "../../../styles/Table.module.css";

export default function table() {
    let tableData = (
        <tr>
            <td className={Styles.tableData}>Sample</td>
            <td className={Styles.tableData}>1.2.3.4</td>
            <td className={Styles.tableData}>Click to reveal</td>
            <td className={Styles.tableData}>
                <div className={localStyles.button}>Delete</div>
                <div className={localStyles.button}>Regenerate</div>
            </td>
        </tr>
    );
    return (
        <table className={Styles.table}>
            <th className={Styles.nameHeader}>Name</th>
            <th className={Styles.IPHeader}>IP Address</th>
            <th className={Styles.alertsHeader}>Key</th>
            <th className={localStyles.actionsHeader}>Actions</th>
            {tableData}
        </table>
    );
}
