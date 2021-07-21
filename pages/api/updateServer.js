import * as Update from "./databaseactions/updateserver.js";
import * as getEmail from "./authenticator/modules/getServer.js";
const checkToken = require("./authenticator/modules/checkToken.js");

export default async (req, res) => {

    const server = req.query.server;
    const key = req.query.key;
    const email = req.query.email;

    const name = req.query.name;
    const ping = req.query.ping;
    const loss = req.query.loss;
    const cpu  = req.query.cpu;
    const ram  = req.query.ram;

    console.log('Ping' +  ping);

    // Authentication
    const CHECK_EMAIL = new checkToken(server);

    const key_email = await CHECK_EMAIL.run(key);
    const server_email = await getEmail.getServer(server, email);

    console.log('server_email'); console.log(server_email); console.log(email); console.log(server);

    if (key_email.email != server_email.email) {
        console.log("UpdateServer: AUTHENTICATION FAILED");

        res.status(200).json({
            results: "AUTHENTICATION FAILED",
        });
        return;
    }

    res.status(200).json({result: await Update.updateserver(server, name, ping, loss, cpu, ram)});
};
