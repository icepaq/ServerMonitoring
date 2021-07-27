const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export async function main(serverip, servername, email, ping, loss, cpu, ram) {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        const collection = client.db("serverpanel").collection("servers");

        const r = await collection.insertOne({
            serverip: serverip,
            name: servername,
            email: email,
            ping: ping, // latency and packet loss threshold
            loss: loss,
            cpu: cpu,
            ram: ram,
        });

        await client.close();

        return r;
    } catch (err) {
        return err;
    } finally {
        await client.close();
    }
}
