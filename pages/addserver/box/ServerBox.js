import Styles from "../../../styles/NewServer.module.css";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ServerBox() {
    const cookie = new Cookies();
    const router = useRouter();

    let email = cookie.get("logincookieemail");
    let key = cookie.get("logincookie");

    let serverName;
    let IPAddress;
    let latency;
    let packetloss;
    let cpu;
    let ram;

    const setServerName = (e) => {
        serverName = e.target.value;
    };

    const setIPAddress = (e) => {
        IPAddress = e.target.value;
    };

    const setLatency = (e) => {
        latency = e.target.value;
    };

    const setPacketloss = (e) => {
        packetloss = e.target.value;
    };

    const setCPU = (e) => {
        cpu = e.target.value;
    };

    const setRAM = (e) => {
        ram = e.target.value;
    };

    const addserver = () => {
        let urlString =
            "http://localhost/api/addserver" +
            "?email=" +
            email +
            "&key=" +
            key +
            "&serverip=" +
            IPAddress +
            "&servername=" +
            serverName +
            "&pingthreshold=" +
            latency +
            "&lossthreshold=" +
            packetloss +
            "&cputhreshold=" +
            cpu +
            "&ramthreshold=" +
            ram;
        fetch(urlString).then(() => router.push("/Servers"));
    };

    return (
        <div className={Styles.column}>
            <div className={Styles.background}>
                <h1 className={Styles.title}>New Server</h1>

                <div className={Styles.form}>
                    Server Name <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setServerName}
                    />
                </div>
                <div className={Styles.form}>
                    IP Address / Domain <br />
                    <input
                        className={Styles.input}
                        type="text"
                        onChange={setIPAddress}
                    />
                </div>
                <div className={Styles.form}>
                    Latency Threshold <br />
                    <input
                        className={Styles.input}
                        type="text"
                        placeholder="In milliseconds"
                        onChange={setLatency}
                    />
                </div>
                <div className={Styles.form}>
                    Packetloss Threshold <br />
                    <input
                        className={Styles.input}
                        type="text"
                        placeholder="In milliseconds"
                        onChange={setPacketloss}
                    />
                </div>
                <div className={Styles.form}>
                    CPU Threshold <br />
                    <input
                        className={Styles.input}
                        type="text"
                        placeholder="Percentage"
                        onChange={setCPU}
                    />
                </div>
                <div className={Styles.form}>
                    RAM Threshold <br />
                    <input
                        className={Styles.input}
                        type="text"
                        placeholder="Percentage"
                        onChange={setRAM}
                    />
                </div>
                <div className={Styles.longButton} onClick={addserver}>
                    Add Server
                </div>
            </div>
        </div>
    );
}
