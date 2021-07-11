import { useState } from "react";
import Styles from "../styles/Login.module.css";
import Cookies from "universal-cookie";

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
        console.log("Attempting Login");
        fetch(
            "/api/authenticator/login?email=" + email + "&password=" + password
        )
            .then((res) => res.json())
            .then((r) => {
                console.log(r.result);
                cookie.set("logincookie", r.result, { maxAge: 600 });
            })
            .then(() => {
                location.replace("/Overview");
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
                        password="text"
                        className={Styles.input}
                        placeholder="password"
                        onChange={changePassword}
                    />
                    <div className={Styles.buttons}>
                        <div className={Styles.button} onClick={login}>
                            Login
                        </div>
                        <div className={Styles.button}>Create Account</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
