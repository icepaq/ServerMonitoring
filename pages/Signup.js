import Styles from "../styles/Login.module.css";
import localStyles from "../styles/Signup.module.css";

export default function Login() {
    return (
        <div className={Styles.wrapper}>
            <div className={Styles.elementHolder}>
                <div className={localStyles.center}>
                    Signup <br />
                    <input
                        type="text"
                        className={Styles.input}
                        placeholder="email"
                    />
                    <br />
                    <input
                        type="text"
                        className={Styles.input}
                        placeholder="password"
                    />
                    <div className={Styles.buttons}>
                        <div className={Styles.button}>Login</div>
                        <div className={Styles.button}>Create Account</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
