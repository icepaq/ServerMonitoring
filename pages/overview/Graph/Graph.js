import Styles from "../../../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export default class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ServerName: "Loading...",
            token: props.token,
            graphData: [1, 2, 3, 4, 5],
            graphLabel: [1, 2, 3, 4, 5],
            called: false,
        };

        const cookie = new Cookies();
        const email = cookie.get("logincookieemail");

        // Server's pinned graph
        fetch(
            "http://localhost:3000/api/pinnedservers?email=" +
                email +
                "&key=" +
                this.state.token
        )
            .then((res) => res.json())
            .then((r) => {
                this.setState({
                    ServerName: r.result.server,
                });
            })
            .then(() => {
                fetch(
                    "http://localhost:3000/api/ping?server=" +
                        this.state.ServerName +
                        "&key=" +
                        this.state.token
                )
                    .then((res) => res.json())
                    .then((r) => {
                        let tempData = [];
                        let tempLabels = [];

                        for (let i = 0; i < 10; i++) {
                            tempData.push(r.results[i].latency);
                            tempLabels.push(r.results[i].datestring);
                        }

                        this.setState({
                            graphData: tempData,
                            graphLabel: tempLabels,
                        });
                    });
            });
    }

    render() {
        let LastUpdate = new Date();
        LastUpdate = LastUpdate.toUTCString();

        const data = {
            labels: this.state.graphLabel,
            options: {
                legend: {
                    display: false,
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

        return (
            <div className={Styles.graph}>
                <h1 className={Styles.graphTitle}>{this.state.ServerName}</h1>
                <h1 className={Styles.graphDate}>{LastUpdate}</h1>
                <div className={Styles.LineWrapper}>
                    <Line data={data} />
                </div>
            </div>
        );
    }
}
