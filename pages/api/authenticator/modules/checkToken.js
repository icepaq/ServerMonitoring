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
            console.log(key);

            let r = await collection.findOne(query);

            console.log(Date.now());
            console.log(r.expiry);
            console.log(Date.now() - r.expiry);

            if (Date.now() - r.expiry < 60000) {
                result = {
                    expired: false,
                    email: r.email,
                };
            } else {
                result = {
                    expired: true,
                    email: r.email,
                };
            }

            console.log(r);
        } catch (err) {
            console.log(err);
        } finally {
            await client.close();
        }

        return result;
    }
};
