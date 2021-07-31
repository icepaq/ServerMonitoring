import { useEffect, useState } from "react";
import Styles from "../../../styles/Server.module.css";
import Cookies from "universal-cookie";
import localStyles from "../../../styles/ToggleAlerts.module.css";

export default function table() {

    const cookie = new Cookies();
    const key = cookie.get("logincookie");
    const email = cookie.get("logincookieemail");

    const [tableData, updateTableData] = useState([]);

    let temp = [];
    let servers = [];

    const toggleAlerts = (e) => {
        fetch("https://serverpanel.controlserverhosting.com/api/toggleEmailAlert?server=" + e.target.id + "&key=" + key);
    }

    useEffect(() => {
        fetch("https://serverpanel.controlserverhosting.com/api/getServers?email=" + email + "&key=" + key)
        .then((res) => res.json())
        .then((r) => {
            for (let i = 0; i < r.result.length; i++) {

                let tempalerts;
                console.log(r.result[i].emailalert);
                if(r.result[i].emailalert == true) {
                    tempalerts = 'Alerts On';
                } else {
                    tempalerts = 'Alerts Off';
                }
                temp.push(
                    <tr>
                        <td className={Styles.tableData }>
                        <p className>
                            {r.result[i].name}
                        </p>
                        </td>
                        <td className={Styles.tableData}>
                            {r.result[i].serverip}
                        </td>
                        <td className={Styles.tableData}>
                            <div className={Styles.actionsButton} id={r.result[i].serverip} onClick={toggleAlerts}>
                                {tempalerts}
                            </div>
                        </td>
                    </tr>
                );
            }
            updateTableData(temp);
        })
        .catch((err) => {
            console.log("API Fetch Error");
            console.log(err);
        });
    }, [tableData]);

    
    return (
        <table className={Styles.table}>
            <th className={Styles.nameHeader}>Name</th>
            <th className={Styles.IPHeader}>IP Address</th>
            <th className={Styles.alertsHeader}>Toggle Alert</th>
            {tableData}
        </table>
    );
}
