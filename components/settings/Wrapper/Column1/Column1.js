import Styles from "../../../../styles/Settings.module.css";

export default function OverviewComponent() {
    let name, email, company, role, country;

    const setName = (e) => {
        name = e.target.value;
    };

    const setEmail = (e) => {
        email = e.target.value;
    };

    const setCompany = (e) => {
        company = e.target.value;
    };

    const setRole = (e) => {
        role = e.target.value;
    };

    const setCountry = (e) => {
        country = e.target.value;
    };

    const saveChanges = (e) => {
        fetch(
            "http://localhost:3000/api/updateAccount" +
                "?key=" +
                key +
                "&email=" +
                email +
                "&company=" +
                company +
                "&role=" +
                role +
                "&country=" +
                country
        );
    };

    return (
        <div className={Styles.column}>
            <div className={Styles.accountsettings}>
                <h1 className={Styles.title}>Account Settings</h1>
                <div className={Styles.form}>
                    Name <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setName}
                    />
                </div>
                <div className={Styles.form}>
                    Email <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setEmail}
                    />
                </div>
                <div className={Styles.form}>
                    Company <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setCompany}
                    />
                </div>
                <div className={Styles.form}>
                    Role <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setRole}
                    />
                </div>
                <div className={Styles.form}>
                    Country <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setCountry}
                    />
                </div>
                <div className={Styles.longButton} onClick={saveChanges}>
                    Save Changes
                </div>
            </div>
        </div>
    );
}
