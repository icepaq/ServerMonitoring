import * as GetServers from "../api/databaseactions/getServers";
const checkToken = require("./authenticator/modules/checkToken.js");

export default async (req, res) => {
    const C = new checkToken();

    const email = await C.run(req.query.key);
    if (email.email != req.query.email) {
        res.status(200).json({ result: "Get Server: AUTHENTICATION FAILED" });
        return;
    }

    res.status(200).json({ result: await GetServers.check(req.query.email) });
};
