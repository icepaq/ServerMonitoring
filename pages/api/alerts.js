const checkToken = require("./authenticator/modules/checkToken.js");
import * as getEmail from "./authenticator/modules/getServer.js";

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const TH = require("./databaseactions/getThreshold.js");

export default async (req, res) => {
    const server = req.query.server;
    const key = req.query.key;

    const check = new checkToken(server);

    const key_email = await check.run(key);
    const server_email = await getEmail.getServer(server);

    if (key_email.email != server_email.email) {
        console.log();
        res.status(200).json({ results: "AUTHENTICATION FAILED" });
        return;
    }

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();

    const thresholds = await TH.main(server);
    const pingTH = thresholds.ping;
    const lossTH = thresholds.loss;

    const collection = client.db("serverpanel").collection("latency");
    const cursor = collection.find({ server: server }).sort({ time: -1 });

    let latencyresults = [];
    let alerts = {
        alert: false,
        down: false,
        highlatency: false,
        loss: false,
    };

    await cursor.forEach((result) => {
        latencyresults.push({
            latency: result.latency,
            loss: result.loss,
            alive: result.alive,
        });
    });

    try {
        // Check if server is down
        for (let i = 0; i < 3; i++) {
            if (latencyresults[i].alive) {
                break;
            }

            alerts.alert = true;
            alerts.down = true;
        }
    } catch (err) {
        console.log("Alive not found");
    }

    try {
        // Check for high latency
        for (let i = 0; i < 2; i++) {
            if (latencyresults[i].latency < pingTH) {
                break;
            }
            alerts.alert = true;
            alerts.highlatency = true;
        }
    } catch (err) {
        console.log("Latency not found");
    }

    // Check for packetloss loss
    try {
        for (let i = 0; i < 2; i++) {
            if (latencyresults[i].loss <= lossTH + 1) {
                break;
            }

            alerts.alert = true;
            alerts.loss = true;
        }
    } catch (err) {
        console.log("No packetloss");
    }

    await client.close();

    res.status(200).json({ results: alerts });
};
