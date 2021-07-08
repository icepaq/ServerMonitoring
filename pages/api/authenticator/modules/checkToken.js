module.exports = class CheckToken {
    async run(key) {
        const { MongoClient } = require("mongodb");

        const uri =
            "mongodb+srv://my_username:my_password@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        let result = false;
        try {
            await client.connect();

            const db = client.db("serverpanel");
            const collection = db.collection("tokens");

            let query = {
                token: parseInt(key),
            };

            let r = await collection.findOne(query);

            result = {
                expired: true,
                email: r.email,
            };
        } catch (err) {
            console.log(err);
        } finally {
            await client.close();
        }

        return result;
    }
};
