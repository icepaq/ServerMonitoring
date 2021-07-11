import Styles from "../../../styles/Home.module.css";
import Cookies from "universal-cookie";
import { useState } from "react";

export default function Graph(props) {
    const [ServerName, setServerName] = useState("Loading...");
    const LastUpdate = "14:23:01 Jul-09-2021";

    const cookie = new Cookies();
    const email = cookie.get("logincookieemail");

    fetch(
        "http://localhost:3000/api/pinnedservers?email=" +
            email +
            "&key=" +
            props.token
    )
        .then((res) => res.json())
        .then((r) => {
            console.log(r.result.server);
            setServerName(r.result.server);
        });

    return (
        <div className={Styles.graph}>
            <h1 className={Styles.graphTitle}>{ServerName}</h1>
            <h1 className={Styles.graphDate}>{LastUpdate}</h1>
        </div>
    );
}
