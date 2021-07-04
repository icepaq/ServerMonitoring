const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


export async function main(server) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    
    const collection = client.db('serverpanel').collection('servers');

    const r = await collection.findOne({serverip: server});
    return r;
}
