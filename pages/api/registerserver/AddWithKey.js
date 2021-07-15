import fetch from "node-fetch";
import * as Register from "./databaseactions/Register.js";

export async function register(server, key) {
    fetch("http://" + server + ":8084/setup" + "?api_key=" + key)
        .then((res) => res.json())
        .then((res) => {
            if (res.status == "success") {
                console.log('Res: ');
                console.log(res)
                Register.register(server, key);
                return "success";
            } else {
                console.log("ERROR");
                console.log(res);
                return "error";
            }
        })
        .catch((err) => {
            console.log("Fetch Error");
            return "error";
        });
}
