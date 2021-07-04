const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const TH = require('./databaseactions/getThreshold.js')

export default async (req, res) => {

    const server = req.query.server;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });    
    await client.connect();

    const thresholds = await TH.main(server);
    const pingTH = thresholds.ping;
    const lossTH = thresholds.loss;

    const collection = client.db('serverpanel').collection('latency');
    const cursor = collection.find({server: server}).sort({time: -1});

    let latencyresults = [];
    let alerts = {};

    await cursor.forEach((result) => {
        latencyresults.push({
            latency: result.latency,
            alive: result.alive
        });
    });

    // Check if server is down
    for(let i = 0; i < 3; i++) {
        if (latencyresults[i].alive) {
            alerts.alert = false;
            break;
        }

        alerts.alert = true;
        alerts.down = true;
    }

    // Check for high latency
    for(let i = 0; i < 2; i++) {
        if(latencyresults[i].latency < pingTH) {
            alerts.alert = false;
            break;
        }
        alerts.alert = true;
        alerts.highlatency = true;
    }

    res.status(200).json({results: alerts});
}