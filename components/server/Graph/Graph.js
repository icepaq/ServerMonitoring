import Styles from "../../../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import localStyles from "../../../styles/_Server.module.css"

export default class Graph extends React.Component {
    
    constructor(props) {
        super(props);

        const cookie = new Cookies();
        const email = cookie.get("logincookieemail");
        const token = cookie.get("logincookie");

        

        this.state = {
            ServerName: 'Loading...',
            token: token,
            email: email,
            graphData: [1, 2, 3, 4, 5],
            graphLabel: [1, 2, 3, 4, 5],
            called: false,
            lossData: [1, 2, 3, 4, 5],
            lossLabel: [1, 2, 3, 4, 5],
            cpuData: [1, 2, 3, 4, 5],
            cpuLabel: [1, 2, 3, 4, 5],
            ramData: [1, 2, 3, 4, 5],
            ramLabel: [1, 2, 3, 4, 5],
        };

        console.log(this.state.ServerName);

    }

    componentDidMount() {
        let strURL = window.location.href;
        let url = new URL(strURL);
        let server = url.searchParams.get("server");
        
        this.setState({
            ServerName: server,
        });

        // Server's pinned graph
        fetch(
            "https://serverpanel.controlserverhosting.com/api/ping?server=" +
                server +
                "&key=" +
                this.state.token +
                "&email=" + this.state.email,
        )
            .then((res) => res.json())
            .then((r) => {

                console.log(r);

                let tempData = [];
                let tempLabels = [];

                let tempLossData = [];
                let tempLossLabels = [];

                try {
                    for (let i = 0; i < 10; i++) {
                        tempData.push(r.results[i].latency);
                        tempLabels.push(r.results[i].datestring);

                        tempLossData.push(r.results[i].loss);
                        tempLossLabels.push(r.results[i].datestring);
                    }
                } catch (err) {
                    this.setState({
                        ServerName:
                            this.state.ServerName + " / No Data",
                    });
                }

                this.setState({
                    graphData: tempData,
                    graphLabel: tempLabels,
                    lossData: tempLossData,
                    lossLabel: tempLossLabels,
                });
            });

        // Server's CPU graph
        fetch( "https://serverpanel.controlserverhosting.com/api/cpuHistory?server=" + server )
            .then((res) => res.json())
            .then((r) => {
                console.log('CPU History');
                console.log(server)
                console.log(r);
                let tempData = [];
                let tempLabels = [];

                try {
                    for (let i = r.result.length - 30; i < r.result.length; i++) {
                        let cpu = r.result[i].cpu.substr(0, r.result[i].cpu.length - 1);
                        console.log(cpu);
                        tempData.push(cpu);

                        let tempTime = r.result[i].time;
                        let tempDate = new Date(tempTime).toLocaleTimeString();
                        tempLabels.push(tempDate);
                    }
                } catch (err) {
                    this.setState({
                        ServerName:
                            this.state.ServerName + " / No Data",
                    });
                }

                this.setState({
                    cpuData: tempData,
                    cpuLabel: tempLabels,
                });
            });


        // Server's RAM graph
        fetch( "https://serverpanel.controlserverhosting.com/api/ramHistory?server=" + server )
            .then((res) => res.json())
            .then((r) => {
                console.log('RAM History');
                console.log(server)
                console.log(r);
                let tempData = [];
                let tempLabels = [];

                try {
                    for (let i = r.result.length - 30; i < r.result.length; i++) {
                        tempData.push(r.result[i].ram);
                        
                        let tempTime = r.result[i].time;
                        let tempDate = new Date(tempTime).toLocaleTimeString();
                        tempLabels.push(tempDate);
                    }
                } catch (err) {
                    this.setState({
                        ServerName:
                            this.state.ServerName + " / No Data",
                    });
                }

                this.setState({
                    ramData: tempData,
                    ramLabel: tempLabels,
                });
            });
    }

    render() {
        let LastUpdate = new Date();
        LastUpdate = LastUpdate.toLocaleString();

        const data = {
            labels: this.state.graphLabel,
            options: {
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: { min: 0 },
                        },
                    ],
                },
            },
            datasets: [
                {
                    label: "Latency",
                    data: this.state.graphData,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const lossData = {
            labels: this.state.lossLabel,
            options: {
                legend: {
                    display: false,
                },

                color: [
                    'white'
                ]
            },
            datasets: [
                {
                    label: "Latency",
                    data: this.state.lossData,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const cpuData = {
            labels: this.state.cpuLabel,
            options: {
                legend: {
                    display: false,
                },

                color: [
                    'white'
                ]
            },
            datasets: [
                {
                    label: "Latency",
                    data: this.state.cpuData,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const ramData = {
            labels: this.state.ramLabel,
            options: {
                legend: {
                    display: false,
                },

                color: [
                    'white'
                ]
            },
            datasets: [
                {
                    label: "Latency",
                    data: this.state.ramData,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        return (
            <>
                <div className={localStyles.graph}>
                    <h1 className={Styles.graphTitle}>Latency</h1>
                    <Line data={data} options={{ animation: false }} />
                </div>

                <div className={localStyles.graph}>
                    <h1 className={Styles.graphTitle}>Loss</h1>
                    <Line data={lossData} options={{ animation: false }} />
                </div>

                <div className={localStyles.graph}>
                    <h1 className={Styles.graphTitle}>CPU Usage</h1>
                    <Line data={cpuData} options={{ animation: false }} />
                </div>

                <div className={localStyles.graph}>
                    <h1 className={Styles.graphTitle}>RAM Usage</h1>
                    <Line data={ramData} options={{ animation: false }} />
                </div>
            </>
        );
    }
}
