import { useEffect, useState } from "react";
import Styles from "../../../../styles/Settings.module.css";
import Cookies from "universal-cookie";

export default function OverviewComponent() {
    let name, email, company, role, country;

    const [NAME, SETNAME] = useState();
    const [EMAIL, SETEMAIL] = useState();
    const [COMPANY, SETCOMPANY] = useState();
    const [ROLE, SETROLE] = useState();
    const [COUNTRY, SETCOUNTRY] = useState();

    const cookie = new Cookies();
    const _email = cookie.get("logincookieemail");
    const _key = cookie.get("logincookie");
    email = cookie.get("logincookieemail");

    fetch("http://localhost/api/getUserConfig?email=" + _email + "&key=" + _key)
        .then((res) => res.json())
        .then((r) => {
            console.log(r);
            r = r.results;
            if (r.name != "undefined") SETNAME(r.name);
            if (r.email != "undefined") SETEMAIL(r.email);
            if (r.company != "undefined") SETCOMPANY(r.company);
            if (r.role != "undefined") SETROLE(r.role);
            if (r.country != "undefined") SETCOUNTRY(r.country);
        });

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

    const saveChanges = () => {
        let link =
            "http://localhost/api/updateAccount" +
            "?key=" +
            _key +
            "&name=" +
            name +
            "&email=" +
            _email +
            "&company=" +
            company +
            "&role=" +
            role +
            "&country=" +
            country +
            "&newemail=" +
            email;
        console.log(link);
        fetch(link).catch((err) => {
            console.error("Fetch Error");
        });
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
                        defaultValue={NAME}
                    />
                </div>
                <div className={Styles.form}>
                    Email <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setEmail}
                        defaultValue={EMAIL}
                    />
                </div>
                <div className={Styles.form}>
                    Company <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setCompany}
                        defaultValue={COMPANY}
                    />
                </div>
                <div className={Styles.form}>
                    Role <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setRole}
                        defaultValue={ROLE}
                    />
                </div>
                <div className={Styles.form}>
                    Country <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setCountry}
                        defaultValue={COUNTRY}
                    />
                </div>
                <div className={Styles.longButton} onClick={saveChanges}>
                    Save Changes
                </div>
            </div>
        </div>
    );
}
