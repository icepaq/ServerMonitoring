const MongoClient = require("mongodb").MongoClient;

export async function update(key, newkey) {
    console.log("Key: " + key);
    console.log("New Key: " + newkey);
    
    const uri =
        "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db("serverpanel").collection("keys");

    const filter = {
        key: key,
    };

    const options = {
        upsert: false,
    };

    const update = {
        $set: {
            key: newkey,
        },
    };

    let r = await collection.updateOne(filter, update, options);

    return r;
}
