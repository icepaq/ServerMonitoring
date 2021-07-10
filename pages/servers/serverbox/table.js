import Styles from "../../../styles/Server.module.css";

export default function table() {
    let tableData = (
        <tr>
            <td className={Styles.tableData}>Sample</td>
            <td className={Styles.tableData}>1.2.3.4</td>
            <td className={Styles.tableData}>0</td>
        </tr>
    );
    return (
        <table className={Styles.table}>
            <th className={Styles.nameHeader}>Name</th>
            <th className={Styles.IPHeader}>IP Address</th>
            <th className={Styles.alertsHeader}>Active Alerts</th>
            {tableData}
        </table>
    );
}
