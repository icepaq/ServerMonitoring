import Styles from "../styles/Login.module.css";
import localStyles from "../styles/ForgotPassword.module.css";
import { useRouter } from "next/router";

export default function ResetPassword() {

    const router = useRouter();
    let email = '';
    const changeEmail = (e) => {
        email = e.target.value;
    }

    const submit = (e) => {
        // Check if the email exists by calling the API
        fetch('https://serverpanel.controlserverhosting.com/api/authenticator/emailexists?email=' + email)
            .then(response => response.json())
            .then((r) => {
                if(r.result == "Not found") {
                    alert('Email Not Found');
                    return;
                }
                // Call the generate reset code api
                fetch('https://serverpanel.controlserverhosting.com/api/authenticator/passwordreset/generateresetcode?email=' + email)
                    .then(response => response.json())
                    .then((r) => {
                        if(r.result == "SUCCESS") {
                            // Redirect to the reset password page
                            router.push('/ResetPassword');
                            return;
                        }
                        alert('Error');
                    });
            });
    }

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.elementHolder}>
                <div className={Styles.center}>
                    <p className={localStyles.header}>Enter your Email Address</p>
                    <p className={localStyles.smallText}>
                        If your email address matches our system, 
                        you will recieve a code by email to reset your password.
                    </p>
                    <input
                        type="text"
                        className={localStyles.input}
                        placeholder="email"
                        onChange={changeEmail}
                    />
                    <br />
                    <div className={Styles.buttons}>
                        <div className={localStyles.bigbutton} onClick={submit}>
                            Reset Password
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    )
}