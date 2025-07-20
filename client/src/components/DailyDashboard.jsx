import React, { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export default function DailyDashboard() {
    const { userEmail, isLoggedIn } = useAuth();
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [rawData, setRawData] = useState({ meals: [], workouts: [] });
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateData, setSelectedDateData] = useState({ meals: [], workouts: [] });

    const formatLocalDate = (date) =>
        new Date(date).toLocaleDateString("en-CA"); // e.g. "2025-07-18"

    useEffect(() => {
        if (isLoggedIn) {
            fetchDashboardData();
            console.log("Dashboard Email: ",userEmail)
        }
    }, [isLoggedIn]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError("");

            const [mealsResponse, workoutsResponse] = await Promise.all([
                fetch(`http://localhost:5050/meal/all/${encodeURIComponent(userEmail)}`),
                fetch(`http://localhost:5050/workout/all/${encodeURIComponent(userEmail)}`),
            ]);

            if (!mealsResponse.ok || !workoutsResponse.ok) {
                throw new Error(`HTTP error! Meals: ${mealsResponse.status}, Workouts: ${workoutsResponse.status}`);
            }

            const meals = await mealsResponse.json() || [];
            const workouts = await workoutsResponse.json() || [];
            setRawData({ meals, workouts });

            const dailyMap = new Map();

            meals.forEach((meal) => {
                const date = formatLocalDate(meal.createdAt);
                if (!dailyMap.has(date)) {
                    dailyMap.set(date, {
                        date,
                        caloriesConsumed: 0,
                        caloriesBurned: 0,
                        mealCount: 0,
                        workoutCount: 0,
                    });
                }
                const dayData = dailyMap.get(date);
                const mealCalories = (meal.foods || []).reduce((sum, food) => sum + (food.nf_calories || 0), 0);
                dayData.caloriesConsumed += mealCalories;
                dayData.mealCount++;
            });

            workouts.forEach((workout) => {
                const date = formatLocalDate(workout.createdAt);
                if (!dailyMap.has(date)) {
                    dailyMap.set(date, {
                        date,
                        caloriesConsumed: 0,
                        caloriesBurned: 0,
                        mealCount: 0,
                        workoutCount: 0,
                    });
                }
                const dayData = dailyMap.get(date);
                const workoutCalories = (workout.exercises || []).reduce((sum, ex) => sum + (ex.nf_calories || 0), 0);
                dayData.caloriesBurned += workoutCalories;
                dayData.workoutCount++;
            });

            const dailyArray = Array.from(dailyMap.values()).sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            setDailyData(dailyArray);
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDateClick = (date) => {
        const mealsForDate = rawData.meals.filter(
            (meal) => formatLocalDate(meal.createdAt) === date
        );
        const workoutsForDate = rawData.workouts.filter(
            (workout) => formatLocalDate(workout.createdAt) === date
        );

        console.log("Selected date:", date);
        console.log("Meals for date:", mealsForDate);
        console.log("Workouts for date:", workoutsForDate);

        setSelectedDateData({ meals: mealsForDate, workouts: workoutsForDate });
        setSelectedDate(date);
    };

    const handleBackToDashboard = () => {
        setSelectedDate(null);
        setSelectedDateData({ meals: [], workouts: [] });
    };

    const getFoodGroupName = (id) => {
        const foodGroupMap = {
            1: "Dairy and Egg Products",
            2: "Spices and Herbs",
            3: "Baby Foods",
            4: "Fats and Oils",
            5: "Poultry Products",
            6: "Soups,Sauces,and Gravies",
            7: "Sausages and Luncheon Meats",
            8: "Breakfast Cereals",
            9: "Fruits and Fruit Juices",
            10: "Pork Products",
            11: "Vegetables and Vegetable Products",
            12: "Nut and Seed Products",
            13: "Beef Products",
            14: "Beverages",
            15: "Finfish and Shellfish Products",
            16: "Legumes and Legume Products",
            17: "Lamb,Veal,and Game Products",
            18: "Baked Products",
            19: "Sweets",
            20: "Cereal Grains and Pasta",
            21: "Fast Foods",
            22: "Meals,Entrees,and Side Dishes",
            23: "Snacks",
            24: "American Indian/Alaska Native Foods",
            25: "Restaurant Foods"
        };
        return foodGroupMap[id] || "N/A";
    };

    if (!isLoggedIn) {
        return (
            <div className="p-4 max-w-5xl mx-auto">
                <p className="text-xl text-red-600">You must be logged in to use this feature!</p>
            </div>
        );
    }

    if (loading) return <div>Loading...</div>;

    if (selectedDate) {
        return (
            <div style={{ padding: "20px", fontFamily: "Arial" }}>
                <button
                    onClick={handleBackToDashboard}
                    style={{
                        backgroundColor: "#007bff", color: "white", padding: "10px 20px",
                        border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px"
                    }}
                >
                    ← Back to Dashboard
                </button>

                <h1>Details for {selectedDate}</h1>

                {/* meals */}
                <h2 style={{ color: "#28a745", marginTop: "30px" }}>Meals ({selectedDateData.meals.length})</h2>
                {selectedDateData.meals.length === 0 ? (
                    <p>No meals recorded for this day.</p>
                ) : (
                    selectedDateData.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} style={{ marginBottom: "30px", border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
                            <h3>Meal {mealIndex + 1} - {new Date(meal.createdAt).toLocaleTimeString()}</h3>
                            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#f8f9fa" }}>
                                        <th style={thStyle}>Image</th>
                                        <th style={thStyle}>Qty</th>
                                        <th style={thStyle}>Unit</th>
                                        <th style={thStyle}>Food</th>
                                        <th style={thStyle}>Calories</th>
                                        <th style={thStyle}>Weight (g)</th>
                                        <th style={thStyle}>Food Group</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(meal.foods || []).map((food, foodIndex) => (
                                        <tr key={foodIndex}>
                                            <td style={tdStyle}>
                                                {food.photo?.thumb ? (
                                                    <img
                                                        src={food.photo.thumb}
                                                        alt={food.food_name}
                                                        style={{ width: "48px", height: "48px", objectFit: "cover" }}
                                                    />
                                                ) : "N/A"}
                                            </td>
                                            <td style={tdStyle}>{food.serving_qty ?? "N/A"}</td>
                                            <td style={tdStyle}>{food.serving_unit ?? "N/A"}</td>
                                            <td style={tdStyle}>{food.food_name}</td>
                                            <td style={tdStyle}>{food.nf_calories ?? "N/A"}</td>
                                            <td style={tdStyle}>{food.serving_weight_grams ?? "N/A"}</td>
                                            <td style={tdStyle}>{getFoodGroupName(food.tags?.food_group)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                                Meal Total: {Math.round((meal.foods || []).reduce((sum, food) => sum + (food.nf_calories || 0), 0))} calories
                            </p>
                        </div>
                    ))
                )}

                {/* workouts */}
                <h2 style={{ color: "#dc3545", marginTop: "30px" }}>Workouts ({selectedDateData.workouts.length})</h2>
                {selectedDateData.workouts.length === 0 ? (
                    <p>No workouts recorded for this day.</p>
                ) : (
                    selectedDateData.workouts.map((workout, workoutIndex) => {
                        console.log("Rendering workout:", workout);
                        return (
                            <div key={workoutIndex} style={{ marginBottom: "30px", border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
                                <h3>Workout {workoutIndex + 1} - {new Date(workout.createdAt).toLocaleTimeString()}</h3>
                                {workout.exercises && workout.exercises.length > 0 ? (
                                    <>
                                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                                            <thead>
                                                <tr style={{ backgroundColor: "#f8f9fa" }}>
                                                    <th style={thStyle}>Exercise</th>
                                                    <th style={thStyle}>MET</th>
                                                    <th style={thStyle}>Duration</th>
                                                    <th style={thStyle}>Calories Burned</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {workout.exercises.map((exercise, exerciseIndex) => (
                                                    <tr key={exerciseIndex}>
                                                        <td style={tdStyle}>{exercise.name || "N/A"}</td>
                                                        <td style={tdStyle}>{exercise.met ?? "N/A"}</td>
                                                        <td style={tdStyle}>{exercise.duration_min || "N/A"} min</td>
                                                        <td style={tdStyle}>{Math.round(exercise.nf_calories || 0)} kcal</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                                            Workout Total: {Math.round((workout.exercises || []).reduce((sum, ex) => sum + (ex.nf_calories || 0), 0))} calories burned
                                        </p>
                                    </>
                                ) : (
                                    <p>No exercises found in this workout.</p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        );
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Daily Fitness Dashboard</h1>

            {error && <div style={{ color: "red" }}>ERROR: {error}</div>}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {dailyData.length === 0 ? (
                    <p>No daily data to display</p>
                ) : (
                    dailyData.map((day, i) => (
                        <div
                            key={i}
                            onClick={() => handleDateClick(day.date)}
                            style={{
                                border: "1px solid #ccc", borderRadius: "10px", padding: "15px",
                                width: "250px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
                            }}
                        >
                            <h3 style={{ color: "#007bff", marginBottom: "10px" }}>{day.date}</h3>
                            <p><strong>Calories Consumed:</strong> {Math.round(day.caloriesConsumed)}</p>
                            <p><strong>Calories Burned:</strong> {Math.round(day.caloriesBurned)}</p>
                            <p><strong>Meals:</strong> {day.mealCount}</p>
                            <p><strong>Workouts:</strong> {day.workoutCount}</p>
                            <p style={{ fontSize: "12px", color: "#666", marginTop: "10px", fontStyle: "italic" }}>
                                Click to view details
                            </p>
                        </div>
                    ))
                )}
            </div>

            <br />
            <button onClick={fetchDashboardData}>Refresh Data</button>
        </div>
    );
}

const thStyle = { border: "1px solid #ddd", padding: "8px" };
const tdStyle = { border: "1px solid #ddd", padding: "8px" };