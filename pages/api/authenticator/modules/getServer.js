//Get email from server

export async function getEmail(server) {
    const { MongoClient } = require("mongodb");

    const uri =
        "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const db = client.db("serverpanel");
    const collection = db.collection("servers");

    const r = await collection.findOne({ serverip: server });

    return r;
}
