const MongoClient = require("mongodb").MongoClient;

export async function getuserconfig(email) {
    const uri =
        "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db("serverpanel").collection("users");

    let r = await collection.findOne({ email: email });

    await client.close();

    return r;
}
