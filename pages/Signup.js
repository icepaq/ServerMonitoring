import Styles from "../styles/Login.module.css";
import localStyles from "../styles/Signup.module.css";
import { useRouter } from "next/router";
import Link from 'next/link'

export default function Login() {
    const router = useRouter();

    let email, password, betakey;

    const updateEmail = (e) => {
        email = e.target.value;
    }
    const updatePassword = (e) => {
        password = e.target.value;
    }

    const updateBetaKey = (e) => {
        betakey = e.target.value;
    }

    const signup = () => {
        fetch("http://localhost/api/authenticator/emailexists?email=" + email)
            .then((r) => r.json())
            .then((r) => {
                
                if (r.result == "EMAIL_EXISTS") {
                    alert("Email Exists");
                    return;
                }
                fetch("http://localhost/api/authenticator/signup?email=" + email + "&password=" + password)
                    .then((r) => r.json())
                    .then((r) => {
                        if (r.result == "INVALID_BETAKEY") {
                            alert("Invalid Beta Key");
                            return;
                        }
                        router.push("/Login");
                    });
            })
    };

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.elementHolder}>
                <div className={localStyles.center}>
                    Signup <br />
                    <input
                        type="text"
                        className={Styles.input}
                        placeholder="email" 
                        onChange={updateEmail}
                    />
                    <br />
                    <input
                        type="password"
                        className={Styles.input}
                        placeholder="password"
                        onChange={updatePassword}
                    />
                    <input
                        type="password"
                        className={Styles.input}
                        placeholder="password"
                        onChange={updatePassword}
                    />
                    <input
                        type="password"
                        className={Styles.input}
                        placeholder="Beta Key"
                        onChange={updateBetaKey}
                    />
                    <div className={Styles.buttons}>
                        <div className={Styles.button} onClick={signup}>Sign Up</div>
                        <Link href="/Login">
                            <div className={Styles.button}>Have an account? Log in.</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
