const checkToken = require("./authenticator/modules/checkToken.js");
const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export default async (req, res) => {
    const email = req.query.email;
    const key = req.query.key;

    const CHECK_EMAIL = new checkToken();
    const key_email = await CHECK_EMAIL.run(key);

    try {
        if (key_email.email != email) {
            console.log(key_email.email);
            console.log(key);

            res.status(200).json({ result: "Wrong Key" });
            return;
        }
    } catch (err) {
        console.error("Error");
        return;
    }

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db("serverpanel").collection("pins");

    const r = await collection.findOne({ email: email });

    await client.close();

    res.status(200).json({ result: r });
};
