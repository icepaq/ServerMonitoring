// Check if a server has been properly registered

export async function check(serverip) {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db("serverpanel").collection("servers");
    const r = await collection.findOne({serverip: serverip});

    if (r == null || r == undefined) {
        return false;
    }

    await client.close();
    return true;
}
