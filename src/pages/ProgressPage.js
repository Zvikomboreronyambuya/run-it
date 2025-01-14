import React, { useState, useEffect } from "react";
import { getRunningProgress, addRunningLog, getRunningLogs } from "../api/MockApi";
import { useAuth } from "../context/AuthContext";
import '../styles/ProgressPage.css';

const ProgressPage = () => {
    const [weeklyData, setWeeklyData] = useState([]);
    const [runningLogs, setRunningLogs] = useState([]);
    const { user } = useAuth();
    console.log("Logged in user:", user?.id);

    const [newLog, setNewLog] = useState({
        userId: user?.id || "",
        distance: "",
        duration: "",
        pace: "",
        date: "",
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchProgressData = async () => {
    
            if(user?.id) {
                try {
                    const progressResponse = await getRunningProgress(user.id);
                    console.log('Progress data fetched:', progressResponse);
                if (progressResponse.success) {
                    setWeeklyData(progressResponse.data);
                }

                const logsResponse = await getRunningLogs(user.id);
                console.log('Logs data fetched:', logsResponse);
                setRunningLogs(logsResponse);

                } catch (error) {
                console.error("Error fetching progress data:", error);

                }
            }
    };
    if (user?.id) {
        fetchProgressData();
        }
    }, [user]);

    const handleAddLog = async (e) => {
        e.preventDefault();
        const response = await addRunningLog({...newLog, userId: user?.id});
        if (response.success) {
            setRunningLogs((prevLogs) => [...prevLogs, response.log]);
            setNewLog({
                userId: user?.id || "",
                distance: "",
                duration: "",
                pace: "",
                date: "",
            });
            setIsFormVisible(false);
        }
    }


    const totalDistance= weeklyData.reduce(
        (sum, week) => sum + week.distance, 0);

    const overallAvgPace =
        weeklyData.length > 0
        ? (
            weeklyData.reduce(
                (sum, week) => 
                sum + 
                parseFloat(week.avgPace.split(":")[0]) +
                parseFloat(week.avgPace.split(":")[1]) / 60,
                0
            ) / weeklyData.length
        ).toFixed(2)
        : 0;

    return (
        <div>
            <h1 className="progress-title">Progress</h1>
            <div className="summary-title">
                <h3 className="progress-summary">Summary</h3>
                <p id="summary">Total Distance: {totalDistance.toFixed(2)} Km</p>
                <p id="summary" >
                    Overall Avg Pace: {Math.floor(overallAvgPace)}:
                    {Math.round((overallAvgPace %1) *60)
                    .toString()
                    .padStart(2, "0")}{""}
                min/km
                </p>
            </div>
            <div>
                <h3 className="progress-weekly">Weekly Progress</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Week</th>
                            <th>Distance (Km)</th>
                            <th>Avg Pace (min/km)</th>
                            <th>Runs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeklyData.map((week) => (
                            <tr key={week.week}>
                                <td>{week.week}</td>
                                <td>{week.distance.toFixed(2)}</td>
                                <td>{week.avgPace}</td>
                                <td>{week.runs}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="progress-weekly">Running Logs</h3>   
                    <ul className="progress-list">
                        {runningLogs.map((log) => (
                        <li className="list-log" key={log.id}>
                            <p>
                                <strong>Date: </strong>{log.date}
                            </p>
                            <p>
                                <strong>Distance: </strong>{log.distance} Km
                            </p>
                            <p>
                                <strong>Duration: </strong>{log.duration} minutes
                            </p>
                            <p>
                                <strong>Pace: </strong>{log.pace} min/km
                            </p>
                        </li>
                    ))}
                </ul>

                <h3>Add Run</h3>
                    <button className="cancel-add" onClick={() => setIsFormVisible((prev)=> !prev)}>
                        {isFormVisible ? "Cancel" : "Add New Log"}
                    </button>
                    {isFormVisible && (
                    <form onSubmit={handleAddLog}>
                        <label>
                            Distance (Km):
                            <input
                                type="number"
                                value={newLog.distance}
                                onChange={(e) => setNewLog({...newLog, distance: e.target.value})}
                                required
                            />
                        </label>
                        <label>
                            Duration (minutes):
                            <input
                                type="number"
                                value={newLog.duration}
                                onChange={(e) => setNewLog({...newLog, duration: e.target.value})}
                                required
                            />
                        </label>
                        <label>
                            Pace (min/km):
                            <input
                                type="text"
                                value={newLog.pace}
                                onChange={(e) => setNewLog({...newLog, pace: e.target.value})}
                                required
                            />
                        </label>
                        <label>
                            Date:
                            <input
                                type="date"
                                value={newLog.date}
                                onChange={(e) => setNewLog({...newLog, date: e.target.value})}
                                required
                            />
                        </label>
                        <button className="cancel-add" type="submit">Add Log</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProgressPage;


  