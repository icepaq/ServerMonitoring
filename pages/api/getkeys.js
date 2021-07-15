const checkToken = require("./authenticator/modules/checkToken.js");
import * as getEmail from "./authenticator/modules/getServer.js";
import * as GetKeys from './databaseactions/getkeys.js'

export default async (req, res) => {
    const key = req.query.key;
    const server = req.query.server;

    const check = new checkToken(server);
    const key_email = await check.run(key);
    const server_email = await getEmail.getServer(server);

    if(key_email.email != server_email.email) {
        console.log('Get Keys Dont Match');
        return;
    }

    // Get key
    // If key is not there return undefined
    res.status(200).json({result: await GetKeys.getkeys(server)});
}