export default async (req, res) => {
    let messages = [];
    let servers = [];

    const email = req.query.email;
    const key = req.query.key;

    // Get Servers
    await fetch(
        "https://serverpanel.controlserverhosting.com/api/getServers?email=" +
            email +
            "&key=" +
            key
    )
        .then((res) => res.json())
        .then((r) => {
            for (let i = 0; i < r.result.length; i++) {
                servers.push(r.result[i]);
            }
        })
        .catch((err) => {
            console.log("Fetch Error");
        });

    // Generate Alert Messages
    let d = new Date();
    for (let i = 0; i < servers.length; i++) {
        await fetch(
            "https://serverpanel.controlserverhosting.com/api/alerts?server=" +
                servers[i].serverip +
                "&key=" +
                key
        )
            .then((res) => res.json())
            .then((r) => {
                if (r.results.down) {
                    messages.push({
                        name: servers[i].name,
                        serverip: servers[i].serverip,
                        message: "Server not responding",
                        date: d.toLocaleString(),
                    });
                }
                if (r.results.highlatency) {
                    messages.push({
                        name: servers[i].name,
                        serverip: servers[i].serverip,
                        message: "High latency",
                        date: d.toLocaleString(),
                    });
                }
                if (r.results.loss) {
                    messages.push({
                        name: servers[i].name,
                        serverip: servers[i].serverip,
                        message: "High packetloss",
                        date: d.toLocaleString(),
                    });
                }
            })
            .catch((err) => {
                console.log("Fetch Error");
            });
    }

    res.status(200).json({ results: messages });
};
