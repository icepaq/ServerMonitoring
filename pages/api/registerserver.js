import * as WithoutKey from "./registerserver/AddWithoutKey.js";
import * as WithKey from "./registerserver/AddWithKey";
import * as UpdateAPIKey from "./updateapikey.js"

export default async (req, res) => {
    const key = req.query.key;
    const server = req.query.server;

    fetch("http://localhost/api/getkeys?key=" + key + "&server=" + server)
        .then(res => res.json())
        .then((r) => {
            if(r.result == null) {
                console.log("Registering");
                WithoutKey.register(server).then((k) => console.log(k));
            } else {
                console.log("Updating");
                UpdateAPIKey.update(server).then((k) => console.log(k));
            }
        });

    res.status(200).json({result: ''});
};
