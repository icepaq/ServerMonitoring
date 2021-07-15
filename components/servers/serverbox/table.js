import Styles from "../../../styles/Server.module.css";
import Cookies from "universal-cookie";
import { useState } from "react";

export default function table() {
    const cookie = new Cookies();
    const key = cookie.get("logincookie");
    const email = cookie.get("logincookieemail");
    const [tableData, updateTableData] = useState("Loading...");

    const remove = (e) => {
        let query = "http://localhost/api/removeserver?server=" +
                        e.target.id +
                        "&key=" +
                        key + 
                        "&email=" +
                        email;

        console.log(query);
        fetch(
            query
        ).catch((err) => {
            console.log("Fetch Error");
        });
    };

    const pinserver = (e) => {
        const server = e.target.id;
        fetch(
            "http://localhost/api/pinServer?server=" +
                server +
                "&key=" +
                key +
                "&email=" +
                email
        ).catch((err) => {
            console.log("Fetch Error");
        });
    };

    let temp = [];
    fetch("http://localhost/api/getServers?email=" + email + "&key=" + key)
        .then((res) => res.json())
        .then((r) => {
            for (let i = 0; i < r.result.length; i++) {
                temp.push(
                    <tr>
                        <td className={Styles.tableData}>{r.result[i].name}</td>
                        <td className={Styles.tableData}>
                            {r.result[i].serverip}
                        </td>
                        <td className={Styles.tableData}>
                            <div
                                className={Styles.actionsButton}
                                id={r.result[i].serverip}
                                onClick={remove}
                            >
                                Delete
                            </div>
                            <div
                                className={Styles.actionsButton}
                                id={r.result[i].serverip}
                                onClick={pinserver}
                            >
                                Pin Server
                            </div>
                        </td>
                    </tr>
                );
            }
            updateTableData(temp);
        })
        .catch((err) => {
            console.log("Fetch Error");
        });
    return (
        <table className={Styles.table}>
            <th className={Styles.nameHeader}>Name</th>
            <th className={Styles.IPHeader}>IP Address</th>
            <th className={Styles.IPHeader}>Actions</th>
            {tableData}
        </table>
    );
}
