// Remove all stored keys
// Remove all latency data
// Remove all packetloss data
// Remove pin
// Remove server

export async function remove(server) {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    let collection;
    let op;

    // Keys
    collection = client.db("serverpanel").collection("keys");
    op = await collection.deleteMany({ server: server });
    console.log("Deleted " + op.deletedCount + " documents");

    // Latency
    collection = client.db("serverpanel").collection("latency");
    op = await collection.deleteMany({ server: server });
    console.log("Deleted " + op.deletedCount + " documents");

    // Packetloss
    collection = client.db("serverpanel").collection("packetloss");
    op = await collection.deleteMany({ server: server });
    console.log("Deleted " + op.deletedCount + " documents");

    // Pin
    collection = client.db("serverpanel").collection("pins");
    op = await collection.deleteOne({ server: server });
    console.log("Deleted " + op.deletedCount + " documents");

    // Server
    collection = client.db("serverpanel").collection("servers");
    op = await collection.deleteOne({ serverip: server });
    console.log("Deleted " + op.deletedCount + " documents");
}