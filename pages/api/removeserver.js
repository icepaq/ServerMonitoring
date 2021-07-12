import * as Remove from "./databaseactions/removeserver.js";
import * as getEmail from "./authenticator/modules/getServer.js";
const checkToken = require("./authenticator/modules/checkToken.js");

export default async (req, res) => {
    // Remove all stored keys
    // Remove all latency data
    // Remove all packetloss data
    // Remove pin
    // Remove server

    const server = req.query.server;
    const serverkey = req.query.serverkey;
    const key = req.query.key;
    let pid;

    // Authentication
    const CHECK_EMAIL = new checkToken(server);

    const key_email = await CHECK_EMAIL.run(key);
    const server_email = await getEmail.getServer(server);

    if (key_email.email != server_email.email) {
        res.status(200).json({ results: "AUTHENTICATION FAILED" });
        return;
    }

    await Remove.remove(server);
    res.status(200).json({});
};
