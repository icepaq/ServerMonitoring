import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Styles from "../../../styles/Alerts.module.css";
import localStyles from "../../../styles/_Server.module.css";
import Information from "./information.js";
import Cookies from "universal-cookie";

export default function InformationRow() {
    const cookie = new Cookies();
    const key = cookie.get("logincookie");

    const router = useRouter();
    const server = router.query.server;

    const [latency, setLatency] = useState("");
    const [loss, setLoss] = useState("");
    const [cpu, setCPU] = useState("");
    const [ram, setRAM] = useState("");

    let _latency, _loss, _cpu, _ram;

    // Fetch latency Fetch Packetloss
    if (latency == "") {
        console.log("calling");
        fetch("http://localhost/api/ping?server=" + server + "&key=" + key)
            .then((res) => res.json())
            .then((r) => {
                try {
                    _latency = r.results[0].latency;
                    _loss = r.results[0].loss;
                } catch (err) {
                    console.log(err);
                    console.log(
                        "Loss and latency error. You most likely don't have any data here"
                    );
                }
            })
            .then(() => {
                try {
                fetch(
                    "http://localhost/api/checkCPU?key=" +
                        key +
                        "&server=" +
                        server
                )
                    .then((res) => res.json())
                    .then((r) => {
                        _cpu = r.result;
                    })
                    .then(() => {
                        cookie.set("loaded", "true");
                    }) 
                } catch (err) {
                    console.log(err);
                }
                setLatency(_latency);
                setLoss(_loss);
                setCPU(_cpu);

                fetch("http://localhost/api/checkRAM?key=" + key + "&server=" + server)
                    .then((res) => res.json())
                    .then((r) => {
                        console.log('RAM');
                        console.log(r);
                        let percent = parseInt( parseInt(r.result.used) / parseInt(r.result.total) * 100 ) + "%";
                        setRAM(percent);
                    });
            });
    }
    // Fetch CPU usage
    // Fetch RAM usage
    return (
        <>
            <div className={localStyles.informationRow}>
                <Information number={latency} title="Latency" />
                <Information number={loss} title="Packetloss" />
                <Information number={cpu} title="CPU Usage" />
                <Information number={ram} title="RAM Usage" />
            </div>
        </>
    );
}
