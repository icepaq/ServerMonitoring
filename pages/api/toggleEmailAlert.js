import * as ToggleEmailAlerts from './databaseactions/toggleEmailAlert.js'
import * as getEmail from "./authenticator/modules/getServer.js";
const checkToken = require("./authenticator/modules/checkToken.js");

export default async (req, res) => {

    const server = req.query.server;
    const key = req.query.key;

    // Authentication
    const CHECK_EMAIL = new checkToken(server);

    const key_email = await CHECK_EMAIL.run(key);
    const server_email = await getEmail.getServer(server);


    if (key_email.email != server_email.email) {
        console.log("UpdateServer: AUTHENTICATION FAILED");

        res.status(200).json({
            results: "AUTHENTICATION FAILED",
        });
        return;
    }

    
    res.status(200).json({results: await ToggleEmailAlerts.toggle(server)}); 
}