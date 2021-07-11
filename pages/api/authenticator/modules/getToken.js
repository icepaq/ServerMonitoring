module.exports = class Authenticate {
    async run(email) {
        const { MongoClient } = require("mongodb");

        const uri =
            "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        let r, token;
        try {
            await client.connect();

            const db = client.db("serverpanel");
            const collection = db.collection("tokens");

            token = Math.floor(Math.random() * 100000000);

            let query = {
                token: token,
                email: email,
                expiry: Date.now() + 60,
            };

            r = await collection.insertOne(query);
        } catch (err) {
            console.log("Something went wrong");
            console.log(err);
        }

        await client.close();

        return token;
    }
};
