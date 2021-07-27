//

export async function getServer(server, email) {
    const { MongoClient } = require("mongodb");

    const uri =
        "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const db = client.db("serverpanel");
    const collection = db.collection("servers");

    console.log(server);
    const r = await collection.findOne({ serverip: server });
    console.log(r);

    await client.close();

    return r;
}
