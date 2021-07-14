import * as User from "./databaseactions/getuserconfig.js";
const checkToken = require("./authenticator/modules/checkToken.js");

export default async (req, res) => {
    const key = req.query.key;
    const email = req.query.email;

    // Authentication
    const CHECK_EMAIL = new checkToken();
    const key_email = await CHECK_EMAIL.run(key);

    if (key_email.email != email) {
        console.log("GetUserConfig: AUTHENTICATION FAILED");
        console.log(key_email);
        console.log(email);

        res.status(200).json({
            results: "GetUserConfig: AUTHENTICATION FAILED",
        });
        return;
    }

    const result = await User.getuserconfig(req.query.email);
    console.log(result);
    res.status(200).json({ results: result });
};
