const MongoClient = require("mongodb").MongoClient;

export async function update(email, newEmail) {
    const uri =
        "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const keys = client.db("serverpanel").collection("keys");
    const pins = client.db("serverpanel").collection("pins");
    const servers = client.db("serverpanel").collection("servers");
    const users = client.db("serverpanel").collection("users");

    const filter = {
        email: email,
    };

    const options = {
        upsert: false,
    };

    const update = {
        $set: { email: newEmail },
    };

    await keys.updateOne(filter, update, options);
    await pins.updateOne(filter, update, options);
    await servers.updateOne(filter, update, options);
    await users.updateOne(filter, update, options);

    await client.close();
}
