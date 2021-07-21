// Connect to my MongoDB server
const MongoClient = require("mongodb").MongoClient;

export async function updateserver(serverip, server, ping, loss, cpu, ram) {
    const uri =
    "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db("serverpanel").collection("servers");
    
    const filter = {
        serverip: serverip,
    };

    const options = {
        upsert: false,
    };

    const update = {
        $set: {
            name: server,
            ping: ping,
            loss: loss,
            cpu: cpu,
            ram: ram,
        },
    };

    const r = await collection.updateOne(filter, update, options);

    await client.close();
    return r;
}