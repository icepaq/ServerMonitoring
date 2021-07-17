import fetch from "node-fetch";
import * as UpdateAPIKey from "./databaseactions/updateapikey";
import * as GetKeys from "./databaseactions/getkeys.js";

// Create a mongodb connection


export async function update(server) {
    let newkey = Math.random() * 100000000000000000;

    let key = await GetKeys.getkeys(server);

    console.log("URL: ");
    console.log("http://" + server + ":8084/updateAPIKey" + "?api_key=" + key.key + "&new_key=" + newkey);

    fetch("http://" + server + ":8084/updateAPIKey" + "?api_key=" + key.key + "&new_key=" + newkey)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.status === "success") {
                console.log("API Key updating");
                UpdateAPIKey.update(key.key, newkey);
            }
        })
        .catch((err) => {
            console.log("UpdateKey: Fetch Error");
            console.log(err);
        });
}
