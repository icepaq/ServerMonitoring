const { MongoClient } = require("mongodb");
const CheckUser = require("./modules/checkuser.js");
const Crypt = require("crypto");

export default async (req, res) => {
    const checkuser = new CheckUser();

    if (await checkuser.run(req.query.email)) {
        res.status(200).json({ result: "EMAIL_EXSTS" });
    } else {
        const uri =
            "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        let email = req.query.email;
        let password = req.query.password;
        let result;

        password = "54LT3D18" + password;
        password = Crypt.createHash("sha512").update(password).digest("hex");

        try {
            await client.connect();
            const database = client.db("serverpanel");
            const collection = database.collection("users");

            const query = {
                email: email,
                password: password,
            };

            result = await collection.insertOne(query);
            console.log(result);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }

        await client.close();

        res.status(200).json({ result: result });
    }
};
