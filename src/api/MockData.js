export const users = [
    { id: "1", email: "znyambuya@gmail.com", password: "password123", name: "Zvikomborero Nyambuya" },
    { id: "2", email: "user2@example.com", password: "securepass", name: "User 2" },
];

export  const runningLogs = [
    { id: "r1", userId: "1", distance: 5, duration: 30, pace: "6:15", date: "2025-01-01"},
    { id: "r2", userId: "1", distance: 10, duration: 60, pace: "6:40", date: "2025-01-02"},
    { id: "r3", userId: "1", distance: 7, duration: 45, pace: "6:25", date: "2025-01-03"},
    { id: "r4", userId: "2", distance: 6, duration: 20, pace: "6:45", date: "2025-01-01"},
    { id: "r5", userId: "2", distance: 10, duration: 40, pace: "6:40", date: "2025-01-02"},
    { id: "r6", userId: "2", distance: 4, duration: 30, pace: "7:30", date: "2025-01-03"},
];


export const runningGoals = [
    { id: "g1", userId: "1", targetDistance: 30, achievedDistance: 15, startDate: "2025-01-01", endDate: "2025-01-07"},
    { id: "g2", userId: "1", targetDistance: 72, achievedDistance: 23, startDate: "2025-01-01", endDate: "2025-01-31"},
    { id: "g1", userId: "2", targetDistance: 20, achievedDistance: 10, startDate: "2025-01-01", endDate: "2025-01-07"},
    { id: "g2", userId: "2", targetDistance: 40, achievedDistance: 20, startDate: "2025-01-01", endDate: "2025-01-31"},
];

export const runningProgress = [
    { userId: "1", 
        weeklyData: [
            { week: "2025-W01", distance: 20, avgPace: "6:15", runs: 3, weeklyDateRange: "January 1- January 7, 2025" },
            { week: "2025-W02", distance: 25, avgPace: "6:30", runs: 4, weeklyDateRange: "January 8- January 14, 2025" },
            { week: "2025-W03", distance: 30, avgPace: "6:20", runs: 5, weeklyDateRange: "January 15- January 21, 2025" },
        ],
    },
    { userId: "2",
        weeklyData: [
            { week: "2025-W01", distance: 10, avgPace: "6:45", runs: 2, weeklyDateRange: "January 1- January 7, 2025" },
            { week: "2025-W02", distance: 15, avgPace: "6:40", runs: 3, weeklyDateRange: "January 8- January 14, 2025" },
            { week: "2025-W03", distance: 20, avgPace: "7:00", runs: 4, weeklyDateRange: "January 15- January 21, 2025" },
        ],
    },
];

export const runningAchievements = [
    { userId: "1", badge: "First 5K Run", date: "2025-01-01" },
    { userId: "1", badge: "10K Streaker", date: "2025-01-02" },
    { userId: "2", badge: "First 5K Run", date: "2025-01-01" },
    { userId: "2", badge: "10K Streaker", date: "2025-01-02" },
];