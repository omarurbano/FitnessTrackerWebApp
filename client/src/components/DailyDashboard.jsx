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

    const user = JSON.parse(localStorage.getItem("user"));

    const formatLocalDate = (date) =>
        new Date(date).toLocaleDateString("en-CA"); // e.g. "2025-07-18"

    useEffect(() => {
        if (isLoggedIn) {
            fetchDashboardData();
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

    if (loading) {
        return (
            <div className="p-4 max-w-5xl mx-auto">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (selectedDate) {
        return (
            <div className="p-4 max-w-5xl mx-auto py-12">
                <button
                    onClick={handleBackToDashboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mb-5 transition-colors"
                >
                    ← Back to Dashboard
                </button>

                <h1 className="text-3xl font-bold mb-6">Details for {selectedDate}</h1>

                {/* meals */}
                <h2 className="text-2xl font-semibold text-green-600 mt-8 mb-4">
                    Meals ({selectedDateData.meals.length})
                </h2>
                {selectedDateData.meals.length === 0 ? (
                    <p className="text-gray-600">No meals recorded for this day.</p>
                ) : (
                    selectedDateData.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="mb-8 border border-gray-300 rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-3">
                                Meal {mealIndex + 1} - {new Date(meal.createdAt).toLocaleTimeString()}
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse mt-3">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="border border-gray-300 p-2 text-left">Image</th>
                                            <th className="border border-gray-300 p-2 text-left">Qty</th>
                                            <th className="border border-gray-300 p-2 text-left">Unit</th>
                                            <th className="border border-gray-300 p-2 text-left">Food</th>
                                            <th className="border border-gray-300 p-2 text-left">Calories</th>
                                            <th className="border border-gray-300 p-2 text-left">Weight (g)</th>
                                            <th className="border border-gray-300 p-2 text-left">Food Group</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(meal.foods || []).map((food, foodIndex) => (
                                            <tr key={foodIndex} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 p-2">
                                                    {food.photo?.thumb ? (
                                                        <img
                                                            src={food.photo.thumb}
                                                            alt={food.food_name}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-400">N/A</span>
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 p-2">{food.serving_qty ?? "N/A"}</td>
                                                <td className="border border-gray-300 p-2">{food.serving_unit ?? "N/A"}</td>
                                                <td className="border border-gray-300 p-2">{food.food_name}</td>
                                                <td className="border border-gray-300 p-2">{food.nf_calories ?? "N/A"}</td>
                                                <td className="border border-gray-300 p-2">{food.serving_weight_grams ?? "N/A"}</td>
                                                <td className="border border-gray-300 p-2">{getFoodGroupName(food.tags?.food_group)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-3 font-bold text-lg">
                                Meal Total: {Math.round((meal.foods || []).reduce((sum, food) => sum + (food.nf_calories || 0), 0))} calories
                            </p>
                        </div>
                    ))
                )}

                {/* workouts */}
                <h2 className="text-2xl font-semibold text-red-600 mt-8 mb-4">
                    Workouts ({selectedDateData.workouts.length})
                </h2>
                {selectedDateData.workouts.length === 0 ? (
                    <p className="text-gray-600">No workouts recorded for this day.</p>
                ) : (
                    selectedDateData.workouts.map((workout, workoutIndex) => {
                        console.log("Rendering workout:", workout);
                        return (
                            <div key={workoutIndex} className="mb-8 border border-gray-300 rounded-lg p-4">
                                <h3 className="text-xl font-semibold mb-3">
                                    Workout {workoutIndex + 1} - {new Date(workout.createdAt).toLocaleTimeString()}
                                </h3>
                                {workout.exercises && workout.exercises.length > 0 ? (
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse mt-3">
                                                <thead>
                                                    <tr className="bg-gray-50">
                                                        <th className="border border-gray-300 p-2 text-left">Exercise</th>
                                                        <th className="border border-gray-300 p-2 text-left">MET</th>
                                                        <th className="border border-gray-300 p-2 text-left">Duration</th>
                                                        <th className="border border-gray-300 p-2 text-left">Calories Burned</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {workout.exercises.map((exercise, exerciseIndex) => (
                                                        <tr key={exerciseIndex} className="hover:bg-gray-50">
                                                            <td className="border border-gray-300 p-2">{exercise.name || "N/A"}</td>
                                                            <td className="border border-gray-300 p-2">{exercise.met ?? "N/A"}</td>
                                                            <td className="border border-gray-300 p-2">{exercise.duration_min || "N/A"} min</td>
                                                            <td className="border border-gray-300 p-2">{Math.round(exercise.nf_calories || 0)} kcal</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="mt-3 font-bold text-lg">
                                            Workout Total: {Math.round((workout.exercises || []).reduce((sum, ex) => sum + (ex.nf_calories || 0), 0))} calories burned
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-gray-600">No exercises found in this workout.</p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        );
    }

    return (
        <div className="p-4 max-w-5xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">Daily Fitness Dashboard</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    ERROR: {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {dailyData.length === 0 ? (
                    <p className="text-gray-600 col-span-full">No daily data to display</p>
                ) : (
                    dailyData.map((day, i) => (
                        <div
                            key={i}
                            onClick={() => handleDateClick(day.date)}
                            className="border border-gray-300 rounded-lg p-4 shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-white"
                        >
                            <h3 className="text-xl font-semibold text-blue-600 mb-3">{day.date}</h3>
                            <div className="space-y-2">
                                <p><span className="font-semibold">Calories Consumed:</span> {Math.round(day.caloriesConsumed)}</p>
                                <p><span className="font-semibold">Calories Burned:</span> {Math.round(day.caloriesBurned)}</p>
                                <p><span className="font-semibold">Meals:</span> {day.mealCount}</p>
                                <p><span className="font-semibold">Workouts:</span> {day.workoutCount}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-3 italic">
                                Click to view details
                            </p>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-8">
                <button
                    onClick={fetchDashboardData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                    Refresh Data
                </button>
            </div>
        </div>
    );
}