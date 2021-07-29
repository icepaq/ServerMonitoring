import { useState } from "react";
import Styles from "../styles/Login.module.css";
import Cookies from "universal-cookie";
import Link from 'next/link'

export default function Login() {
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");

    const cookie = new Cookies();

    const changeEmail = (e) => {
        updateEmail(e.target.value);
    };

    const changePassword = (e) => {
        updatePassword(e.target.value);
    };

    const login = () => {
        fetch(
            "https://serverpanel.controlserverhosting.com/api/authenticator/login?email=" +
                email +
                "&password=" +
                password
        )
            .then((res) => res.json())
            .then((r) => {
                cookie.set("logincookie", r.result, { maxAge: 3600 });
                cookie.set("logincookieemail", email, { maxAge: 3600 });
            })
            .then(() => {
                location.replace("/Overview");
            })
            .catch((err) => {
                console.log("Fetch Error");
            });
    };

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.elementHolder}>
                <div className={Styles.center}>
                    Login to Your Account <br />
                    <input
                        type="text"
                        className={Styles.input}
                        placeholder="email"
                        onChange={changeEmail}
                    />
                    <br />
                    <input
                        type="password"
                        className={Styles.input}
                        placeholder="password"
                        onChange={changePassword}
                    />
                    <div className={Styles.buttons}>
                        <div className={Styles.button} onClick={login}>
                            Login
                        </div>
                        <Link href="/Signup">
                            <div className={Styles.button}>Create Account</div> 
                        </Link>
                        <Link href="/ForgotPassword">
                            <p className={Styles.forgotpassword}>Forgot Password?</p>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
