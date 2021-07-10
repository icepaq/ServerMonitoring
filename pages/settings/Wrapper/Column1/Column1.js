import Styles from "../../../../styles/Settings.module.css";

export default function OverviewComponent() {
    return (
        <div className={Styles.column}>
            <div className={Styles.accountsettings}>
                <h1 className={Styles.title}>Account Settings</h1>

                <div className={Styles.form}>
                    Name <br />
                    <input className={Styles.input} type="text" />
                </div>
                <div className={Styles.form}>
                    Email <br />
                    <input className={Styles.input} type="text" />
                </div>
                <div className={Styles.form}>
                    Company <br />
                    <input className={Styles.input} type="text" />
                </div>
                <div className={Styles.form}>
                    Role <br />
                    <input className={Styles.input} type="text" />
                </div>
                <div className={Styles.form}>
                    Country <br />
                    <input className={Styles.input} type="text" />
                </div>
                <div className={Styles.longButton}>Save Changes</div>
            </div>
        </div>
    );
}
