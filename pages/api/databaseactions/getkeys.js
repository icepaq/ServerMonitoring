export async function getkeys(server) {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db('serverpanel').collection('keys');

    console.log(server);
    const r = await collection.findOne({server: server})
    console.log(r);

    await client.close();

    return r;
}