const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const TH = require("./databaseactions/getThreshold.js");

export default async (req, res) => {
    const server = req.query.server;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
        
    const cpucollection = client.db("serverpanel").collection("cpu");
    const cpucursor = cpucollection.find({ server: server }).sort({ time: -1 });

    let cpuresults = [];
    await cpucursor.forEach((result) => {
        cpuresults.push({
            ram: result,
        });
    });

    await client.close();

    res.status(200).json({
        result: cpuresults,
    });
}