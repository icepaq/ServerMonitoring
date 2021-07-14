const MongoClient = require("mongodb").MongoClient;

export async function update(email, name, company, role, country) {
    const uri =
        "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db("serverpanel").collection("users");

    const filter = {
        email: email,
    };

    const options = {
        upsert: false,
    };

    const update = {
        $set: { name: name, company: company, role: role, country: country },
    };

    let r = await collection.updateOne(filter, update, options);

    return r;
}
