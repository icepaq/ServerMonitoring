import * as NoEmail from "./databaseactions/updateaccountnoemail.js";
const checkToken = require("./authenticator/modules/checkToken.js");

export default async (req, res) => {
    const key = req.query.key;
    const email = req.query.email;
    const newEmail = req.query.newemail;

    const name = req.query.name;
    const company = req.query.company;
    const role = req.query.role;
    const country = req.query.country;

    // Authentication
    const CHECK_EMAIL = new checkToken();
    const key_email = await CHECK_EMAIL.run(key);

    let r;

    if (key_email.email != email) {
        console.log("GetUserConfig: AUTHENTICATION FAILED");
        console.log(key_email);
        console.log(email);

        res.status(200).json({
            results: "GetUserConfig: AUTHENTICATION FAILED",
        });
        return;
    }

    if (email == newEmail) {
        // Update email
        // Update name
        // Update company
        // Update role
        // Update country
        console.log("UpdateAccount: email unchanged");
        r = await NoEmail.update(email, name, company, role, country);
    } else {
        console.log("UpdateAccount: Emails Don't Match");
        console.log(email);
        console.log(newEmail);
        // Update name
        // Update company
        // Update role
        // Update role
        // Update email
        // Update email in keys
        // Update email in pins
        // Update email in servers
        // Update email in users
    }

    res.status(200).json({ results: r });
};
