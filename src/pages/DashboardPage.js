import React, { useState, useEffect } from "react";
import { getRunningLogs, getRunningProgress } from "../api/MockApi";
import { useAuth } from "../context/AuthContext";
import '../styles/DashboardPage.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DashboardPage = () => {
    const [recentRuns, setRecentRuns] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchRecentRuns = async () => {
            if (user?.id) {
                const logs = await getRunningLogs(user.id);
                const sortedLogs = logs
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5);
                setRecentRuns(sortedLogs);
            }
        };

        const fetchProgressData = async () => {
            if (user?.id) {
                const progressResponse = await getRunningProgress(user.id);
                if (progressResponse.success) {
                    setProgressData(progressResponse.data);
                }
            }
        };

        if (user?.id) {
            fetchRecentRuns();
            fetchProgressData();
        }
    }, [user]);

    const chartData = {
        labels: progressData.map((data) => data.weeklyDateRange),
        datasets: [
            {
                label: "Distance (Km)",
                data: progressData.map((data) => data.distance),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
            {
                label: "Runs",
                data: progressData.map((data) => data.runs),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };
  
    return (
        <div>
            <h1 className="greeting">
                {user.name ? `Hi, ${user.name}!` : "Hi there!"}
            </h1>
            <section>
                <h2 className="recent-runs">Recent Runs</h2>
                {recentRuns.length === 0 ? (
                    <p className="dash-message">No recent runs</p>
                ) : (
                    <ul className="dash-list">
                        {recentRuns.map((run) => (
                            <li className="run-list" key={run.id}>
                                <p>
                                    <strong>Date: </strong>
                                    {run.date}
                                </p>
                                <p>
                                    <strong>Distance: </strong>
                                    {run.distance} Km
                                </p>
                                <p>
                                    <strong>Duration: </strong>
                                    {run.duration} minutes
                                </p>
                                <p>
                                    <strong>Pace: </strong>
                                    {run.pace} min/km
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <section>
                <h2 className="progress-chart">Progress Chart</h2>
                {progressData.length === 0 ? (
                    <p className="dash-message">No progress data available</p>
                ) : (
                    <div className="progress-chart-container" >
                        <Line data={chartData} options={chartOptions} />
                    </div>
                )}
            </section>
        </div>
    );
};

export default DashboardPage;
