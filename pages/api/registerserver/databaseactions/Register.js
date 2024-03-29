const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export async function register(server, key) {
    await client.connect();

    const collection = client.db("serverpanel").collection("keys");

    const r = await collection.insertOne({
        server: server,
        key: key,
    });

    await client.close();

    return r;
}
