import Styles from "../../../styles/Alerts.module.css";

export default function table() {
    let tableData = (
        <tr>
            <td className={Styles.tableData}>Sample</td>
            <td className={Styles.tableData}>1.2.3.4</td>
            <td className={Styles.tableData}>Server not responding.</td>
            <td className={Styles.tableData}>17:28:00 Jul-09-2021</td>
        </tr>
    );
    return (
        <table className={Styles.table}>
            <th className={Styles.nameHeader}>Name</th>
            <th className={Styles.IPHeader}>IP Address</th>
            <th className={Styles.messageHeader}>Message</th>
            <th className={Styles.timeHeader}>Time</th>
            {tableData}
        </table>
    );
}
