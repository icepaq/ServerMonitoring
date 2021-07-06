import * as GetServer from "./authenticator/modules/getServer.js";
const checkToken = require("./authenticator/modules/checkToken.js");

export default async (req, res) => {
    const server = req.query.server;
    const key = req.query.key;

    const check = new checkToken(server);

    const key_email = await check.run(key);
    const server_email = await GetServer.getServer(server);

    if (key_email.email != server_email.email) {
        console.log();
        res.status(200).json({ results: "AUTHENTICATION FAILED" });
        return;
    }

    res.status(200).json({
        results: await GetServer.getServer(req.query.server),
    });
};