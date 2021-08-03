import fetch from "node-fetch";
import * as Register from "./databaseactions/Register.js";

export async function register(server) {
    let key = Math.random() * 100000000000000000;
    fetch("http://" + server + ":8084/setup" + "?api_key=" + key)
        .then((res) => res.json())
        .then((res) => {
            if (res.status == "success") {
                Register.register(server, key);
                return key;
            } else {
                return "error";
            }
        })
        .catch((err) => {
            console.log("Fetch Error");
            console.log(err);
        });
}
