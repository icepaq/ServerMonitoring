import { useEffect, useState } from "react";
import Styles from "../../../../styles/Settings.module.css";
import Cookies from "universal-cookie";
import { useRouter, userRouter } from "next/router";

export default function OverviewComponent() {
    const router = useRouter();
    const cookies = new Cookies();

    let name, latency, loss, cpu, ram;

    const [NAME, setName] = useState();
    const [LATENCY, setLatency] = useState('');
    const [LOSS, setLoss] = useState();
    const [CPU, setCPU] = useState();
    const [RAM, setRAM] = useState();

    const server = router.query.server;
    const token = cookies.get("logincookie");

    fetch("https://serverpanel.controlserverhosting.com/api/serverinfo?server=" + server + "&key=" + token)
        .then(response => response.json())
        .then(json => {
            setName(json.results.name);
            setLatency(json.results.ping);
            setLoss(json.results.loss);
            setCPU(json.results.cpu);
            setRAM(json.results.ram);

            name = NAME;
            latency = LATENCY;
            loss = LOSS;
            cpu = CPU;
            ram = RAM;
        });

    const submit = () => {
        console.log(latency);
        console.log(loss);
        fetch("https://serverpanel.controlserverhosting.com/api/updateServer?" 
            + "server=" + server
            + "&name=" + name
            + "&ping=" + latency
            + "&loss=" + loss
            + "&cpu=" + cpu
            + "&ram=" + ram
            + "&key=" + token)
            .then(response => response.json())
            .then(json => {
                console.log(json);
            });
    }


    return (
        <div className={Styles.column}>
            <div className={Styles.accountsettings}>
                <h1 className={Styles.title}>Account Settings</h1>
                <div className={Styles.form}>
                    Name <br />
                    <input
                        className={Styles.input}
                        type="text"
                        defaultValue={NAME}
                        onChange={e => name = e.target.value}
                    />
                </div>
                <div className={Styles.form}>
                    Latency Threshold <br />
                    <input
                        className={Styles.input}
                        type="text"
                        defaultValue={LATENCY}
                        onChange={e => latency = e.target.value}
                    />
                </div>
                <div className={Styles.form}>
                    Packetloss Threshold <br />
                    <input
                        className={Styles.input}
                        type="text"
                        defaultValue={LOSS}
                        onChange={e => loss = e.target.value}
                    />
                </div>
                <div className={Styles.form}>
                    CPU Usage Threshold<br />
                    <input
                        className={Styles.input}
                        type="text"
                        defaultValue={CPU}
                        onChange={e => cpu = e.target.value}
                    />
                </div>
                <div className={Styles.form}>
                    RAM Usage Threshold <br />
                    <input
                        className={Styles.input}
                        type="text"
                        defaultValue={RAM}
                        onChange={e => ram = e.target.value}
                    />
                </div>
                <div className={Styles.longButton} onClick={submit}>
                    Save Changes
                </div>
            </div>
        </div>
    );
}
