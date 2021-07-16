import * as GetServers from "../api/databaseactions/getServers";
const checkToken = require("./authenticator/modules/checkToken.js");


export default async (req, res) => {


    const check = new checkToken();
    const key_email = await check.run(req.query.key);

    if(key_email.email != req.query.email) {
        console.log('GetServers authentication error');
        res.status(200).json({ result: "AUTHENTICATION ERROR" });
        return;
    }

    res.status(200).json({ result: await GetServers.check(req.query.email) });
};
