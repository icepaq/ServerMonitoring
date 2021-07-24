import Styles from "../styles/Login.module.css";
import localStyles from "../styles/ForgotPassword.module.css";
import { useRouter } from "next/router";

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
        // If the passwords don't match, alert the user and don't submit
        if (newPassword !== confirmPassword) {
            alert(`Passwords do not match`);
            return;
        }

        // Call the API to reset the password
        fetch("http://localhost/api/resetpassword?code=" + code + "&password=" + newPassword)   
            .then(res => res.json())
            .then((r) => {
                if (r.result = "SUCCESS") {
                    alert(`Password reset successfully`);
                    router.push("/login");
                } else {
                    alert(`Password reset failed`);
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
                        type="text"
                        className={localStyles.input}
                        placeholder="New Password"
                        onChange={changeNewPassword}
                    />
                    <input
                        type="text"
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