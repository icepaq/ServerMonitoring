module.exports = class Authenticate {
    async run(email, password) {
        const { MongoClient } = require("mongodb");

        const uri =
            "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        let r;
        let check = false;
        try {
            await client.connect();

            const db = client.db("serverpanel");
            let collection = db.collection("users");

            let query = {
                email: email,
            };
            r = await collection.findOne(query);

            if (r.password == password) {
                check = true;
            }
        } catch (err) {
            console.log(err);
        } finally {
            await client.close();
        }

        return check;
    }
};
