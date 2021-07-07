import fetch from "node-fetch";
import * as check from "./databaseactions/check.js";
import * as getEmail from "./authenticator/modules/getServer.js";
const checkToken = require("./authenticator/modules/checkToken.js");

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async (req, res) => {
    const server = req.query.server;
    const key = req.query.key;
    const serverkey = req.query.serverkey;

    let pid;

    // Authentication
    const CHECK_EMAIL = new checkToken(server);

    const key_email = await CHECK_EMAIL.run(key);
    const server_email = await getEmail.getServer(server);

    if (key_email.email != server_email.email) {
        res.status(200).json({ results: "AUTHENTICATION FAILED" });
        return;
    }

    // Checking if the RunCommand API has been registered on the server
    const exists = await check.check(server);

    if (!exists) {
        res.status(200).json({ result: "NOT REGISTERED" });
        return;
    }

    await fetch("http://" + server + ":8080/getCPU?api_key=" + serverkey)
        .then((re) => re.json())
        .then((re) => {
            pid = re.pid;
        });

    await sleep(2000);

    await fetch(
        "http://" +
            server +
            ":8080/getoutput?api_key=" +
            serverkey +
            "&pid=" +
            pid
    )
        .then((r) => r.json())
        .then((r) => {
            res.status(200).json({ result: r.content[0].data });
        });
};
