const Email = require('../modules/email.js');
const { MongoClient } = require("mongodb");


export default async (req, res) => {

    const uri =
            "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const email = req.query.email;

    await client.connect();
    const collection = client.db("serverpanel").collection("resetcodes");

    // Delete any codes that might already exist for this email
    await collection.deleteMany({ email: email });

    // Insert the reset code
    const random = Math.random().toString(10).substr(2, 10);

    const r = await collection.insertOne({
        email: email,
        code: random,
        expiry: Date.now() + (60 * 5 * 1000),
    });

    const e = new Email();
    
    await e.send(email, random);

    await client.close();

    res.status(200).json({result: "SUCCESS"});
}