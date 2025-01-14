const handleLogin = async (e) => {
    e.preventDefault();
    
    //console.log("Login button clicked:");
    
    if (!email || !password) {
        setError("Please fill in both email and password");
        return;
    }

    const response = await login(email, password);
    console.log(response);
    if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));

        navigate("/");
    } else {
        alert(response.message);
    }
};

// app.js
function App() {
    return (
      <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      </AuthProvider>
    );
  }
  

  useEffect(() => {
    const fetchGoals = async () => {
        try {
            const goals = await getRunningGoals(user.Id);
            if (Array.isArray(goals)) {
                setGoals(goals);
            } else {
                console.error("getRunningGoals did not return an array:", goals);
            }
        } catch (error) {
            console.error("Error fetching goals:", error);
        }
    };
    fetchGoals();
}, [user]);

/*
const ProgressPage = () => {
    const [weeklyData, setWeeklyData] = useState([]);
    const { user } = useAuth();
    console.log("Logged in user:", user?.id);

    useEffect(() => {
        fetchProgressData();
    }, [user.id]);

    const fetchProgressData = async () => {
        try {
            const response = await getRunningProgress(user.id);
            if (response.success) {
                setWeeklyData(response.data);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Error fetching progress data:", error);
            }
        };

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
        */


    /* const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const { user } = useAuth();
    console.log("Logged in user:", user);

    useEffect(() => {
        const fetchGoals = async () => {
            if (user?.id) {
                const goals = await getRunningGoals(user.id);
                setGoals(goals);
            }
        };
        fetchGoals();
    }, [user]); */

    /* const ProgressPage = () => {
    const [weeklyData, setWeeklyData] = useState([]);
    const { user } = useAuth();
    console.log("Logged in user:", user?.id);

    useEffect(() => {
        const fetchProgressData = async () => {
    
            if(user?.id) {
                try {
                    const response = await getRunningProgress(user.id);
                    console.log('Progress data fetched:', response);
                if (response.success) {
                    setWeeklyData(response.data);
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching progress data:", error);

            }
        }
    };
    if (user?.id) {
        fetchProgressData();
        }
    }, [user]);

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
            <h1>Progress</h1>
            <div>
                <h3>Summary</h3>
                <p>Total Distance: {totalDistance.toFixed(2)} Km</p>
                <p>Overall Avg Pace: {Math.floor(overallAvgPace)}:
                {Math.round((overallAvgPace %1) *60).toString().padStart(2, "0")}{""}
                min/km
                </p>
            </div>
            <div>
                <h3>Weekly Progress</h3>
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
        </div>
    );
};

export default ProgressPage; */


