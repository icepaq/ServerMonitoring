import Styles from "../../../styles/Alerts.module.css";
import Cookies from "universal-cookie";
import React, { useState } from "react";

export default function table() {
    const cookie = new Cookies();
    const key = cookie.get("logincookie");
    const email = cookie.get("logincookieemail");

    const [data, setData] = useState();

    fetch(
        "http://localhost:3000/api/alertsmessages?email=" +
            email +
            "&key=" +
            key
    )
        .then((res) => res.json())
        .then((r) => {
            let temp = [];
            for (let i = 0; i < r.results.length; i++) {
                let jsx = (
                    <tr>
                        <td className={Styles.tableData}>
                            {r.results[i].name}
                        </td>
                        <td className={Styles.tableData}>
                            {r.results[i].serverip}
                        </td>
                        <td className={Styles.tableData}>
                            {r.results[i].message}
                        </td>
                        <td className={Styles.tableData}>
                            {r.results[i].date}
                        </td>
                    </tr>
                );
                temp.push(jsx);
            }
            setData(temp);
        });

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
            {data}
        </table>
    );
}
