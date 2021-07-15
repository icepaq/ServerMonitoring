import * as getEmail from "./authenticator/modules/getServer.js";
const checkToken = require("./authenticator/modules/checkToken.js");

import * as Pin from "./databaseactions/pinserver.js";

export default async (req, res) => {
    const server = req.query.server;
    const email = req.query.email;
    const key = req.query.key;

    // Authentication
    const CHECK_EMAIL = new checkToken(server);

    const key_email = await CHECK_EMAIL.run(key);
    const server_email = await getEmail.getServer(server, email);

    if (key_email.email != server_email.email) {
        console.log("pinServer: Authentication Failed");
        console.log(key_email.email);
        console.log(server_email.email);
        res.status(200).json({ results: "AUTHENTICATION FAILED" });
        return;
    }

    res.status(200).json({
        result: await Pin.pinserver(server, email),
    });
};
