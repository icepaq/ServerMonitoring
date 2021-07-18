const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const TH = require("./databaseactions/getThreshold.js");

export default async (req, res) => {
    const server = req.query.server;
    const key = req.query.key;

    /* IMPORTANT ADD AUTHENTICATION BACK */

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();

    const thresholds = await TH.main(server);

    const pingTH = thresholds.ping;
    const lossTH = thresholds.loss;
    const ramTH = parseInt(thresholds.ram);
    const cpuTH = thresholds.cpu;

    const collection = client.db("serverpanel").collection("latency");
    const cursor = collection.find({ server: server }).sort({ time: -1 });

    let latencyresults = [];
    let alerts = {
        alert: false,
        down: false,
        highlatency: false,
        loss: false,
    };

    await cursor.forEach((result) => {
        latencyresults.push({
            latency: result.latency,
            loss: result.loss,
            alive: result.alive,
        });
    });

    let cpuresults = [];
    const cpucollection = client.db("serverpanel").collection("cpu");
    const cpucursor = cpucollection.find({ server: server }).sort({ time: -1 });

    await cpucursor.forEach((result) => {
        cpuresults.push({
            cpu: result.cpu,
        });
    });

    // Get usage results of RAM
    const ramcollection = client.db("serverpanel").collection("ram");
    const ramcursor = ramcollection.find({ server: server }).sort({ time: -1 });
    let ramresults = [];
    await ramcursor.forEach((result) => {
        ramresults.push({
            ram: result.ram,
        });
    });


    try {
        // Check if server is down
        for (let i = 0; i < 3; i++) {
            if (latencyresults[i].alive) {
                break;
            }

            alerts.alert = true;
            alerts.down = true;
        }
    } catch (err) {
        console.log("Alive not found");
    }

    try {
        // Check for high latency
        for (let i = 0; i < 2; i++) {
            if (latencyresults[i].latency < pingTH) {
                break;
            }
            alerts.alert = true;
            alerts.highlatency = true;
        }
    } catch (err) {
        console.log("Latency not found");
    }

    // Check for packetloss loss
    try {
        for (let i = 0; i < 2; i++) {
            if (latencyresults[i].loss <= lossTH + 1) {
                break;
            }

            alerts.alert = true;
            alerts.loss = true;
        }
    } catch (err) {
        console.log("No packetloss");
    }

    // Check for RAM usage
    try {
        for (let i = 0; i < 2; i++) {
            if (ramresults[i].ram <= ramTH + 1) {
                break;
            }
            alerts.alert = true;
            alerts.ram = true;
        }
    } catch (err) {
        console.log("RAM usage not found");
    }

    // Check for CPU usage
    try {
        for (let i = 0; i < 2; i++) {
            if (cpuresults[i].cpu <= cpuTH + 1) {
                break;
            }
            alerts.alert = true;
            alerts.cpu = true;
        }
    } catch (err) {
        console.log("CPU usage not found");
    }

        

    await client.close();

    res.status(200).json({ results: alerts });
};
