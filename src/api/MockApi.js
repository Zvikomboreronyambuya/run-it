// MockApi.js
import { users, runningLogs, runningGoals, runningProgress, runningAchievements } from "./MockData";

// Authentication
export const login = async (email, password) => {
  const user = users.find((user) => user.email === email && user.password === password);
  if (user) {
    return { success: true, user };
    }
    return { success: false, error: "Invalid email or password" };
};

export const signup = async (email, password, name) => {
    if (users.some((user) => user.email === email)) {
        return { success: false, error: "User with this email already exists" };
    }
    const newUser = { id: Date.now().toString(), email, password, name };
    users.push(newUser);
    return { success: true, user: newUser };
};

// Running Logs
export const getRunningLogs = async (userId) => {
    console.log("getRunningLogs called with userId:", userId);
    console.log("Current runningLogs:", runningLogs);

    const filteredLogs = runningLogs.filter((log) => log.userId === String(userId));
    console.log("Filtered logs:", filteredLogs);

    return filteredLogs;
};

export const addRunningLog = (log) => {
    const newLog = { ...log, id: Date.now().toString() };
    runningLogs.push(newLog);
    return { success: true, log: newLog };
};

export const updateRunningLog = (id, updatedLog) => {
    const index = runningLogs.findIndex((log) => log.id === id);
    if (index !== -1) {
        runningLogs[index] = { ...runningLogs[index], ...updatedLog };
        return { success: true, log: runningLogs[index] };
    }
    return { success: false, message: "Run log not found" };
};

export const deleteRunningLog = (id) => {
    const index = runningLogs.findIndex((log) => log.id === id);
    if (index !== -1) {
        runningLogs.splice(index, 1);
        return { success: true };
    }
    return { success: false, message: "Run log not found" };
};

// Running Goals
 export const getRunningGoals = (userId) => {
    return runningGoals.filter((goal) => goal.userId === userId);
};

export const addRunningGoal = (goal) => {
    const newGoal = { ...goal, id: Date.now().toString() };
    runningGoals.push(newGoal);
    return { success: true, goal: newGoal };
};

export const updateRunningGoal = (id, updatedGoal) => {
    const index = runningGoals.findIndex((goal) => goal.id === id);
    if (index !== -1) {
        runningGoals[index] = { ...runningGoals[index], ...updatedGoal };
        return { success: true, goal: runningGoals[index] };
    }
    return { success: false, message: "Goal not found" };
};

export const deleteRunningGoal = (id) => {
    const index = runningGoals.findIndex((goal) => goal.id === id);
    if (index !== -1) {
        runningGoals.splice(index, 1);
        return { success: true };
    }
    return { success: false, message: "Goal not found" };
};

// Running Progress
export const getRunningProgress = (userId) => {
    const progress = runningProgress.find((progress) => progress.userId === userId);
    if (progress) {
        return { success: true, data: progress.weeklyData };
    }
    return { success: false, message: "Progress not found" };
};

// Running Achievements
export const getRunningAchievements = (userId) => {
    return runningAchievements.filter((achievement) => achievement.userId === userId);
};