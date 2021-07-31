import Styles from "../styles/Login.module.css";
import localStyles from "../styles/Signup.module.css";
import { useRouter } from "next/router";
import Link from 'next/link'
import swal from 'sweetalert2';

export default function Login() {
    const router = useRouter();

    let email, password, confirmPassword, betakey;

    const updateEmail = (e) => {
        email = e.target.value;
    }
    const updatePassword = (e) => {
        password = e.target.value;
    }

    const updateConfirmPassword = (e) => {
        confirmPassword = e.target.value;
    }

    const updateBetaKey = (e) => {
        betakey = e.target.value;
    }

    const validateEmail = () => {
        console.log(email);
        if (!email) {
            return 'invalid';
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            console.log(email);
            console.log('invalid');
            return 'invalid';
        }
        return 'valid';
    }

    const signup = () => {

        if(validateEmail() != 'valid') {
            swal.fire('Invalid Email Address')
            return;
        }

        if(password != confirmPassword) {
            swal.fire('Passwords do not match')
        }

        if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
            swal.fire('Invalid Password')
            return;
        }

        fetch("https://serverpanel.controlserverhosting.com/api/authenticator/emailexists?email=" + email)
            .then((r) => r.json())
            .then((r) => {
                
                if (r.result == "EMAIL_EXISTS") {
                    alert("Email Exists");
                    return;
                }
                fetch("https://serverpanel.controlserverhosting.com/api/authenticator/signup?email=" + email + "&password=" + password)
                    .then((r) => r.json())
                    .then((r) => {
                        if (r.result == "INVALID_BETAKEY") {
                            swal.fire("Invalid Beta Key");
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
                        onChange={updateConfirmPassword}
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
