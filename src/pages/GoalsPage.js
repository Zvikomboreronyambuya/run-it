import React, { useState, useEffect } from "react";
import { getRunningGoals, addRunningGoal } from "../api/MockApi";
import { useAuth } from "../context/AuthContext";
import '../styles/GoalsPage.css';

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const { user } = useAuth();

    const [newGoal, setNewGoal] = useState({
        targetDistance: "",
        achievedDistance: "",
        startDate: "",
        endDate: "",
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchGoals = async () => {
            if (user?.id) {
                try {
                    const fetchedGoals = await getRunningGoals(user.id);
                    setGoals(fetchedGoals);
                } catch (error) {
                    console.error("Error fetching goals:", error);
                }
            }
        };

        fetchGoals();
    }, [user]);

    const handleAddGoal = async (e) => {
        e.preventDefault();
        const newGoalData = {
            ...newGoal,
            userId: user.id,
        };

        const response = await addRunningGoal(newGoalData);
        if (response.success) {
            setGoals((prevGoals) => [...prevGoals, response.goal]);
            setNewGoal({
                targetDistance: "",
                achievedDistance: "",
                startDate: "",
                endDate: "",
            });
            setIsFormVisible(false);
        }
    };

    if (!user) {
        return <p>Please log in to view and manage your goals.</p>;
    }

    return (
        <div>
            <h1 className="goals">Goals</h1>
            <div>
                {goals.length === 0 ? (
                    <p className="goals-message">No active goals. Set a new goal!</p>
                ) : (
                    <ul className="goals-list">
                        {goals.map((goal) => (
                            <li className="set-list" key={goal.id}>
                                <h3>Goal {goal.id}</h3>
                                <p>
                                    <strong>Target Distance:</strong> {goal.targetDistance} Kms
                                </p>
                                <p>
                                    <strong>Achieved Distance:</strong> {goal.achievedDistance} Kms
                                </p>
                                <p>
                                    <strong>Start Date:</strong> {goal.startDate}
                                </p>
                                <p>
                                    <strong>End Date:</strong> {goal.endDate}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {Math.round((goal.achievedDistance / goal.targetDistance) * 100)}%
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h3 className="new-goal">Add New Goal</h3>
                <button className="cancel-add" onClick={() => setIsFormVisible((prev) => !prev)}>
                    {isFormVisible ? "Cancel" : "Add Goal"}
                </button>
                {isFormVisible && (
                    <form onSubmit={handleAddGoal}>
                        <label>
                            Target Distance (Kms):
                            <input
                                type="number"
                                value={newGoal.targetDistance}
                                onChange={(e) =>
                                    setNewGoal({ ...newGoal, targetDistance: e.target.value })
                                }
                                required
                            />
                        </label>
                        <label>
                            Achieved Distance (Kms):
                            <input
                                type="number"
                                value={newGoal.achievedDistance}
                                onChange={(e) =>
                                    setNewGoal({ ...newGoal, achievedDistance: e.target.value })
                                }
                                required
                            />
                        </label>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                value={newGoal.startDate}
                                onChange={(e) =>
                                    setNewGoal({ ...newGoal, startDate: e.target.value })
                                }
                                required
                            />
                        </label>
                        <label>
                            End Date:
                            <input
                                type="date"
                                value={newGoal.endDate}
                                onChange={(e) =>
                                    setNewGoal({ ...newGoal, endDate: e.target.value })
                                }
                                required
                            />
                        </label>
                        <button className="cancel-add" type="submit">Add Goal</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default GoalsPage;
