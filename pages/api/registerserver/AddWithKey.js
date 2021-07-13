import fetch from "node-fetch";
import * as Register from "./databaseactions/Register.js";

export async function register(server, key) {
    fetch("http://" + server + ":8080/setup" + "?api_key=" + key)
        .then((res) => res.json())
        .then((res) => {
            if (res.status == "success") {
                Register.register(server, key);
                return "success";
            } else {
                return "error";
            }
        });
}
