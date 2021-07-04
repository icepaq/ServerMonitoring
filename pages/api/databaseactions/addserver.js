const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export async function main(serverip, servername, email, ping, loss) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const collection = client.db("serverpanel").collection("servers");

        const r = await collection.insertOne({
            serverip: serverip,
            name: servername,
            email: email,
            ping: ping,  // latency and packet loss threshold
            loss: loss
        });

        client.close();
        
        return r;
    
    }
    catch(err) {
        return err;
    }
}
