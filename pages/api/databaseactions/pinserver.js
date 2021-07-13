export async function pinserver(server, email) {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db("serverpanel").collection("pins");

    await collection.deleteMany({ email: email });
    await collection.insertOne({ server: server, email: email });
}
