// Check if a server has been properly registered

export async function check(key) {
    const MongoClient = require("mongodb").MongoClient;
    const uri =
        "mongodb+srv://my_username:" + process.env.MONGOPASS + "@cluster0.dgxwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();

    try {
        const collection = client.db("serverpanel").collection("betakeys");

        const r = await collection.findOne({ key: key });
        
        const filter = {
            key: key,
        };
    
        const options = {
            upsert: false,
        };
    
        const update = {
            $set: { free: false },
        };
        
        try {
            await collection.updateOne(filter, update, options);
        } catch (err) {
            console.log(err);
        }
    
        await client.close();
    
        if( r.free ) {
            return true;
        }
    } catch (err) {
        await client.close();
        return false;
    }

    

    return false;
}
