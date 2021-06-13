const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export default async (req, res) => {
    const server = req.query.server;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });    
    await client.connect();

    const collection = client.db('serverpanel').collection('packetloss');
    const cursor = collection.find({server: server}).sort({time: 1});

    let results = [];

    await cursor.forEach((result) => {
        results.push({date: result.date, results: result.results});
    });

    console.log(results.results)
    res.status(200).json({results: results});
}