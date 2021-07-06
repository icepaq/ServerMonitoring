import fetch from "node-fetch";
import * as Register from "./databaseactions/Register.js";

export async function register(server) {
    let key = Math.random() * 100000000000000000;
    console.log(key);
    console.log("fetching");
    fetch("http://" + server + ":8080/setup" + "?api_key=" + key)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.status == "success") {
                Register.register(server, key);
                return "success";
            } else {
                return "error";
            }
        });
}