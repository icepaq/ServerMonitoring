import fetch from "node-fetch";
import * as CPU from "./hardware/cpu.js";

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async (req, res) => {
    const server = req.query.server;
    const key = req.query.key;
    let pid;
    let results;

    await fetch("http://" + server + ":8080/getCPU?api_key=" + key)
        .then((re) => re.json())
        .then((re) => {
            pid = re.pid;
        });

    await sleep(2000);

    await fetch(
        "http://" + server + ":8080/getoutput?api_key=" + key + "&pid=" + pid
    )
        .then((r) => r.json())
        .then((r) => {
            res.status(200).json({ result: r.content[0].data });
        });
};
