import Styles from "../../../../styles/Settings.module.css";

export default function OverviewComponent() {
    return (
        <div className={Styles.column}>
            <div className={Styles.password}>
                <h1 className={Styles.title}>Update Password</h1>

                <div className={Styles.form}>
                    Password <br />
                    <input className={Styles.input} type="text" />
                </div>
                <div className={Styles.form}>
                    New Password <br />
                    <input className={Styles.input} type="text" />
                </div>
                <div className={Styles.form}>
                    Repeat Password <br />
                    <input className={Styles.input} type="text" />
                </div>
            </div>

            <div className={Styles.authenticator}>
                <h1 className={Styles.title}>Account Settings</h1>

                <div className={Styles.longButton}>
                    Add Google Authenticator
                </div>
            </div>
        </div>
    );
}
