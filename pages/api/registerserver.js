import * as WithoutKey from "./registerserver/AddWithoutKey.js";
import * as WithKey from "./registerserver/AddWithKey";

export default async (req, res) => {
    const key = req.query.key;
    const server = req.query.server;

    console.log(server);
    console.log(key);

    if (!key) {
        console.log("Key undefined");
        WithoutKey.register(server);
    } else {
        console.log("Key defined");
        WithKey.register(server, key);
    }

    res.status(200).json({});
};
