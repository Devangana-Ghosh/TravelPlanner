"use client";
import { useEffect } from "react";
import Head from "next/head";
import Chart from "chart.js/auto";
import "./page.css";

export default function Dashboard() {
    useEffect(() => {
        displayBarChart();
    }, []);

    function navigateTo(url) {
        window.location.href = url;
    }

    function displayBarChart() {
        const ctx = document.getElementById("placesChart")?.getContext("2d");
        if (!ctx) return;

        const frequentPlacesData = [
            { name: "Bangkok", visits: 22.78 },
            { name: "Paris", visits: 19.1 },
            { name: "London", visits: 19.09 },
            { name: "Dubai", visits: 15.93 },
            { name: "Singapore", visits: 14.67 },
            { name: "New York", visits: 13.60 },
            { name: "Istanbul", visits: 13.40 },
            { name: "Tokyo", visits: 12.93 },
        ];

        const placeNames = frequentPlacesData.map((place) => place.name);
        const placeVisits = frequentPlacesData.map((place) => place.visits);

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: placeNames,
                datasets: [
                    {
                        label: "Number of Visits (in millions)",
                        data: placeVisits,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }

    return (
        <html>
            <body>
                <Head>
                    <title>My Dashboard</title>
                    <link rel="stylesheet" href="/dashboard.css" />
                </Head>

                {/* Navbar */}
                <nav className="navbar">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/travel_guides">Travel Guides</a></li>
                        <li><a href="/hotel">Hotels</a></li>
                        <li><a href="/news">News</a></li>
                    </ul>
                </nav>

                <header className="header">
                    <div className="header-container">
                        <h1>Welcome to Your Dashboard</h1>
                    </div>
                </header>

                <div className="container">
                    <div className="dashboard-item">
                        <h2>My Trips</h2>
                        <button onClick={() => navigateTo("/trip/view")}>View Trips</button>
                        <button onClick={() => navigateTo("/trip")}>Add New Trip</button>
                    </div>

                    <div className="dashboard-item">
                        <h2>My Activities</h2>
                        <button onClick={() => navigateTo("/activities")}>View Activities</button>
                        <button onClick={() => navigateTo("/activities/form")}>Add New Activity</button>
                    </div>
                </div>

                <div className="statistics-container">
                    <h2>Most Frequently Visited Cities</h2>
                    <canvas id="placesChart" width="400" height="300"></canvas>
                </div>

                <style jsx>{`
                    .navbar {
                        background: #333;
                        padding: 10px;
                        text-align: center;
                    }

                    .navbar ul {
                        list-style: none;
                        padding: 0;
                    }

                    .navbar ul li {
                        display: inline;
                        margin: 0 15px;
                    }

                    .navbar ul li a {
                        color: white;
                        text-decoration: none;
                    }

                    .header {
                        text-align: center;
                        padding: 20px;
                        background: #f4f4f4;
                    }

                    .container {
                        display: flex;
                        justify-content: space-around;
                        margin-top: 20px;
                    }

                    .dashboard-item {
                        background: #f4f4f4;
                        padding: 20px;
                        border-radius: 8px;
                        text-align: center;
                    }

                    .statistics-container {
                        text-align: center;
                        margin-top: 30px;
                    }
                `}</style>
            </body>
        </html>
    );
}
