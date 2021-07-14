import Styles from "../../../../styles/Settings.module.css";
import Cookies from "universal-cookie";

export default function OverviewComponent() {
    let password, newpassword, repeatpassword;

    const cookie = new Cookies();
    const email = cookie.get("logincookieemail");

    const setPassword = (e) => {
        password = e.target.value;
    };

    const setNewPassword = (e) => {
        newpassword = e.target.value;
    };

    const setRepeatPassword = (e) => {
        repeatpassword = e.target.value;
    };

    const update = () => {
        if (newpassword != repeatpassword) {
            alert("Passwords do not match");
        }

        fetch(
            "http://localhost/api/updatePassword" +
                "?email=" +
                email +
                "&password=" +
                password +
                "&newpassword=" +
                newpassword
        );
    };

    return (
        <div className={Styles.column}>
            <div className={Styles.password}>
                <h1 className={Styles.title}>Update Password</h1>

                <div className={Styles.form}>
                    Password <br />
                    <input
                        className={Styles.input}
                        type="password"
                        onChange={setPassword}
                    />
                </div>
                <div className={Styles.form}>
                    New Password <br />
                    <input
                        className={Styles.input}
                        type="password"
                        onChange={setNewPassword}
                    />
                </div>
                <div className={Styles.form}>
                    Repeat Password <br />
                    <input
                        className={Styles.input}
                        type="password"
                        onChange={setRepeatPassword}
                    />
                </div>
                <div className={Styles.longButton} onClick={update}>
                    Save Changes
                </div>
            </div>

            <div className={Styles.authenticator}>
                <h1 className={Styles.title}>2FA</h1>

                <div className={Styles.longButton}>
                    Add Google Authenticator
                </div>
            </div>
        </div>
    );
}
