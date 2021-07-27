module.exports = class CheckUser {
    async run(email) {
        const { MongoClient } = require("mongodb");

        const uri =
            "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        let r;
        try {
            await client.connect();

            const database = client.db("serverpanel");
            const collection = database.collection("users");

            let query = {
                email: email,
            };

            r = await collection.countDocuments(query);
        } finally {
            await client.close();
        }

        if (r > 0) {
            return true;
        } else {
            return false;
        }
    }
};
