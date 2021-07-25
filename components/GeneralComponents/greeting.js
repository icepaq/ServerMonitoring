import Styles from "../../styles/Home.module.css";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { unstable_renderSubtreeIntoContainer } from "react-dom";


export default function OverviewComponent() {

    const cookie = new Cookies();
    const email = cookie.get("logincookieemail");
    const key = cookie.get("logincookie");

    const [name, setName] = useState('');

    const router = useRouter();

    fetch("http://localhost/api/getUserConfig?email=" + email + "&key=" + key)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setName(data.results.name);
        })
        .catch(error => {
            
        });

    const checkIfLoggedIn = () => {
        if(cookie.get('logincookie') == null || cookie.get('logincookie') == undefined) {
            router.push("/Login");
        }
    }

    const logout = () => {
        cookie.remove("logincookieemail");
        cookie.remove("logincookie");
        router.push("/Login");
    }

    useEffect(() => {
        const id = setInterval(() => {
            checkIfLoggedIn();
        }, 10000)
        return () => clearInterval(id)
      });

    return (
        <div className={Styles.inline}>
            <div className={Styles.greeting}>
                Hi, {name}
            </div>
            <div className={Styles.logout} onClick={logout}>
                    Logout
            </div>
        </div>
        
    )
    
}
