export default async (req, res) => {
    const email = req.query.email;
    const key = req.query.key;

    let servers = [];
    let alerts = 0;
    let down = 0;
    let latency = 0;
    let packetloss = 0;
    // Get servers
    await fetch(
        "http://localhost/api/getServers?email=" + email + "&key=" + key
    )
        .then((res) => res.json())
        .then((r) => {
            for (let i = 0; i < r.result.length; i++) {
                servers.push(r.result[i].serverip);
            }
        });
    // For each server, check alerts
    // Increment variables accordingly
    for (let i = 0; i < servers.length; i++) {
        await fetch(
            "http://localhost/api/alerts?server=" + servers[i] + "&key=" + key
        )
            .then((res) => res.json())
            .then((r) => {
                if (r.results.down) {
                    down += 1;
                }
                if (r.results.highlatency) {
                    latency += 1;
                }
                if (r.results.loss) {
                    packetloss += 1;
                }
                if (r.results.down || r.results.highlatency || r.results.loss) {
                    alerts += 1;
                }
            });
    }

    res.status(200).json({
        alerts: alerts,
        down: down,
        latency: latency,
        packetloss: packetloss,
    });
};
