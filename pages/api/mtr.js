const checkToken = require("./authenticator/modules/checkToken.js");
import * as getEmail from "./authenticator/modules/getServer.js";

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export default async (req, res) => {
    const server = req.query.server;
    const key = req.query.key;

    const check = new checkToken(server);

    const key_email = await check.run(key);
    const server_email = await getEmail.getServer(server);

    if (key_email.email != server_email.email) {
        console.log("MTR: Authentication Failed");
        res.status(200).json({ results: "AUTHENTICATION FAILED" });
        return;
    }

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();

    const collection = client.db("serverpanel").collection("packetloss");
    const cursor = collection.find({ server: server }).sort({ time: 1 });

    let results = [];

    await cursor.forEach((result) => {
        results.push({ date: result.date, results: result.results });
    });

    await client.close();
    res.status(200).json({ results: results });
};
