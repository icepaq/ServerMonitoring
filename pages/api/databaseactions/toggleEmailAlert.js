// Connect to my MongoDB server
const MongoClient = require("mongodb").MongoClient;

export async function toggle(serverip) {
    const uri =
    "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    let togglealert;

    const collection = client.db("serverpanel").collection("servers");
    const result = await collection.findOne({serverip: serverip});

    if(result.emailalert == true ) {
        togglealert = false;
    } else {
        togglealert = true;
    }
    
    const filter = {
        serverip: serverip,
    };

    const options = {
        upsert: false,
    };

    const update = {
        $set: {
            emailalert: togglealert,
        },
    };

    const r = await collection.updateOne(filter, update, options);

    await client.close();
    return r;
}