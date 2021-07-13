const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export async function main(server) {
    console.log("getThresholds Line 6: server - " + server);
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();

    const collection = client.db("serverpanel").collection("servers");

    const r = await collection.findOne({ serverip: server });
    console.log("getThresholds Line 15: r - " + r);
    await client.close();
    return r;
}
