const Crypt = require("crypto");
const { MongoClient } = require("mongodb");
const uri =
            "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
    if (!user) {
        console.log(code);
        console.log(user);
        console.log('Reset Password Code Invalid');
        res.status(200).json({result: "Code Invalid"})
        return;
    }

    const email = await collection.findOne({ code: code });

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

    await client.close();

    res.status(200).json({result: "SUCCESS"});
}