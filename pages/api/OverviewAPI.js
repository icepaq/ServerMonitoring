import * as GetServers from "./databaseactions/getServers.js";

export default async (req, res) => {
    const key = req.query.key;
    let email;
    let servers;
    let alerts = 0;
    let down = 0;
    let pin;

    // Get email address the token is associated with
    await fetch("/api/authenticator/token?key=" + key)
        .then((res) => res.json())
        .then((r) => {
            email = r.key.email;
        });

    // Get all servers associated with email address
    servers = await GetServers.check(email);
    console.log(servers);

    // Get alerts from servers
    for (let i = 0; i < servers.length; i++) {
        //let string = '/api/alerts?server=' + server + '&'
        await fetch("/api/alerts?server=" + servers[i].serverip + "&key=" + key)
            .then((res) => res.json())
            .then((r) => {
                console.log(r);
                if (r.results.alert == true) {
                    alerts += 1;
                }
            });
    }

    // Get pinned server
    await fetch("/api/pinnedservers?email=" + email + "&key=" + key)
        .then((res) => res.json())
        .then((r) => {
            pin = r.result;
        });

    res.status(200).json({
        email: email,
        servers: servers.length,
        alerts: alerts,
        down: down,
    });
};
