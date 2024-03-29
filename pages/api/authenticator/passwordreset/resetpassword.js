const Crypt = require("crypto");
const { MongoClient } = require("mongodb");
const uri =
            "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default async (req, res) => {
    const code = req.query.code;

    let password = req.query.password;

    await client.connect();

    const collection = client.db("serverpanel").collection("resetcodes");
    
    // Check if the code exists in the database
    const user = await collection.findOne({ code: code });

    if (!user || user.expiry < Date.now()) {
        console.log('Reset Password Code Invalid');
        res.status(200).json({result: "Code Invalid"})
        return;
    }

    const email = await collection.findOne({ code: code });
    if (email == null) {
        res.status(200).json({result: "Code Invalid"})
        return;
    }


    // Update the user password
    password = "54LT3D18" + password;
    password = Crypt.createHash("sha512").update(password).digest("hex");

    const users = client.db("serverpanel").collection("users");

    const filter = {
        email: email.email,
    };

    const options = {
        upsert: false,
    };

    const update = {
        $set: {
            password: password,
        },
    };

    await users.updateOne( filter, update, options );

    await collection.deleteMany({ code: code });

    await client.close();

    res.status(200).json({result: "SUCCESS"});
}