import fetch from "node-fetch";
import * as RAM from "./hardware/ram.js";
import * as check from "./databaseactions/check.js";
import * as getEmail from "./authenticator/modules/getServer.js";
const checkToken = require("./authenticator/modules/checkToken.js");

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async (req, res) => {
    const server = req.query.server;
    const serverkey = req.query.serverkey;
    const key = req.query.key;
    const email = req.query.email;
    let pid;

    // Authentication
    const CHECK_EMAIL = new checkToken(server);

    const key_email = await CHECK_EMAIL.run(key);
    const server_email = await getEmail.getServer(server, email);

    if (key_email.email != server_email.email) {
        res.status(200).json({ results: "ram: AUTHENTICATION FAILED" });
        return;
    }

    // Check if server exists
    const exists = await check.check(server);

    if (!exists) {
        res.status(200).json({ result: "NOT REGISTERED" });
        return;
    }

    await fetch("http://" + server + ":8080/getRAM?api_key=" + serverkey)
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
            let final = RAM.ram(r);
            res.status(200).json({ result: final });
        })
        .catch((err) => {
            console.log("Fetch Error");
        });
};
