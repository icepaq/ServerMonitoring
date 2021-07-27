const checkToken = require("./authenticator/modules/checkToken.js");
import * as getEmail from "./authenticator/modules/getServer.js";

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export default async (req, res) => {
    const server = req.query.server;
    const key = req.query.key;
    const email = req.query.email;

    const check = new checkToken(server);

    const key_email = await check.run(key);
    const server_email = await getEmail.getServer(server, email);

    let k_email = key_email.email;
    let s_email = server_email.email;

    
    if (k_email != s_email) {
        console.log("Ping Authentication Failed");
        res.status(200).json({ results: "AUTHENTICATION FAILED" });
        return;
    }
    
    
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db("serverpanel").collection("latency");
    const cursor = collection.find({ server: server }).sort({ time: -1 });

    let results = [];

    await cursor.forEach((result) => {
        let date = new Date(result.time);
        results.push({
            latency: result.latency,
            loss: result.loss,
            time: result.time,
            datestring: date.toLocaleString(),
        });
    });

    await client.close();

    res.status(200).json({ results: results });
};
