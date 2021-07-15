import Styles from "../../../styles/Server.module.css";
import localStyles from "../../../styles/Table.module.css";
import Cookie from "universal-cookie";
import { useState } from "react";

export default function table() {
    const [data, setData] = useState([]);
    
    const cookie = new Cookie();

    const email = cookie.get("logincookieemail");
    const key = cookie.get("logincookie");

    let servers = [];

    const register = (e) => {
        console.log(key);
        fetch("http://localhost/api/registerserver?server=" + e.target.id + "&key=" + key)
            .then(res => res.json())
            .then((r) => {
                console.log(r);
            });
    }

    // Get all servers
    fetch("http://localhost/api/getServers?email=" + email + "&key=" + key)
        .then(res => res.json())
        .then((r) => {

            let temp = [];
            for(let i = 0; i < r.result.length; i++) {
                servers.push(r.result[i].serverip);
                temp.push(
                    <tr>
                        <td className={Styles.tableData}>{r.result[i].name}</td>
                        <td className={Styles.tableData}>{r.result[i].serverip}</td>
                        <td className={Styles.tableData}></td>
                        <td className={Styles.tableData}>
                            <div className={localStyles.button}>Delete</div>
                            <div className={localStyles.button} onClick={register} id={r.result[i].serverip}>
                                Regenerate
                            </div>
                        </td>
                    </tr>
                )
            }
            setData(temp);
        });
    
    for(let i = 0; i < servers.length; i++) {
        // fetch keys
        fetch("http://localhost/api/getkeys?key=" + key + "&server=" + servers[i]);
    }

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
            {data}
        </table>
    );
}
