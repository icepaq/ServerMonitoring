import Styles from "../../styles/Home.module.css";
import Cookies from "universal-cookie";
import { useState } from "react";


export default function OverviewComponent() {

    const cookie = new Cookies();
    const email = cookie.get("logincookieemail");
    const key = cookie.get("logincookie");

    const [name, setName] = useState('');

    fetch("http://localhost/api/getUserConfig?email=" + email + "&key=" + key)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setName(data.results.name);
        })
        .catch(error => {
            
        });

    return <div className={Styles.greeting}>Hi, {name}</div>;
    
}
