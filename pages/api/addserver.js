const Main = require("./databaseactions/addserver.js");
const checkToken = require("./authenticator/modules/checkToken.js");
import * as GetServerByName from "./databaseactions/getServerByName.js";

export default async (req, res) => {

    // Check if the server is already added from GetServerByName
    let server = await GetServerByName.check(req.query.serverip);
    if (server) {
        console.log("Server already added");
        res.status(200).json({result: "Server Exists"});
        return;
    }

    const email = req.query.email;
    const key = req.query.key;

    const CHECK_EMAIL = new checkToken();
    const key_email = await CHECK_EMAIL.run(key);

    console.log(key_email.email);
    console.log(key);

    if (key === undefined || email === undefined) {
        res.status(200).json({ result: "Wrong Key" });
        return;
    }

    console.log(key_email.email);
    console.log(email);
    if (key_email.email != email) {
        res.status(200).json({ result: "Wrong Key" });
    }

    res.status(200).json({
        result: await Main.main(
            req.query.serverip,
            req.query.servername,
            req.query.email,
            req.query.pingthreshold,
            req.query.lossthreshold,
            req.query.cputhreshold,
            req.query.ramthreshold
        ),
    });
};
