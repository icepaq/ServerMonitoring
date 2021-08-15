import Styles from "../styles/Login.module.css";
import localStyles from "../styles/ForgotPassword.module.css";
import { useRouter } from "next/router";
import swal from "sweetalert2";

export default function ResetPassword() {

    const router = useRouter();
    let code = '';
    let newPassword = '';
    let confirmPassword = '';

    const changeCode = (e) => {
        code = e.target.value;
    }

    const changeNewPassword = (e) => {
        newPassword = e.target.value;
    }

    const changeConfirmPassword = (e) => {
        confirmPassword = e.target.value;
    }

    const submit = (e) => {

        if (!newPassword.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
            swal.fire('Weak Password.')
            return;
        }

        // If the passwords don't match, alert the user and don't submit
        if (newPassword !== confirmPassword) {
            swal.fire(`Passwords do not match`);
            return;
        }

        // Call the API to reset the password
        fetch("https://serverpanel.controlserverhosting.com/api/authenticator/passwordreset/resetpassword?code=" + code + "&password=" + newPassword)   
            .then(res => res.json())
            .then((r) => {
                console.log(r);
                if (r.result == "SUCCESS") {
                    router.push("/Login");
                } else {
                    swal.fire(`Password reset failed`);
                }
            })
    }

    return (
        <div className={Styles.wrapper}>
            <div className={Styles.elementHolder}>
                <div className={Styles.center}>
                    <p className={localStyles.smallText}>
                        Please enter the code sent to your email address.
                    </p>
                    <input
                        type="text"
                        className={localStyles.input}
                        placeholder="Reset Code"
                        onChange={changeCode}
                    /> 
                    <input
                        type="password"
                        className={localStyles.input}
                        placeholder="New Password"
                        onChange={changeNewPassword}
                    />
                    <input
                        type="password"
                        className={localStyles.input}
                        placeholder="Confirm Password"
                        onChange={changeConfirmPassword}
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