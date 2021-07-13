// Check if a server has been properly registered

export async function check(server) {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db("serverpanel").collection("keys");

    const r = await collection.findOne({ server: server });
    await client.close();

    if (r == undefined) {
        return false;
    }

    return true;
}
