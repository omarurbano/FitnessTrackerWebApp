import React, { useState } from "react";
import axios from "axios";

export default function ExerciseAPI() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const APP_ID = "5c311b3a";
    const APP_KEY = "a1b49a0a6a84533092f2f6bbf7f9224e";

    const handleSearch = async () => {
        try {
            const response = await axios.post(
                "https://trackapi.nutritionix.com/v2/natural/exercise",
                {
                    //placeholder
                    query,
                    gender: "male",
                    weight_kg: 70,
                    height_cm: 175,
                    age: 25,
                },
                {
                    headers: {
                        "x-app-id": APP_ID,
                        "x-app-key": APP_KEY,
                        "x-remote-user-id": "0",
                        "Content-Type": "application/json",
                    },
                }
            );

            const exercises = response.data.exercises ?? [];

            console.log("Exercises:", exercises);
            setResults(exercises);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Error fetching data. Please check your input.");
        }
    };

    const totalCalories = results.reduce(
        (sum, ex) => sum + (ex.nf_calories || 0),
        0
    );

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold">Exercise Calorie Lookup</h2>

            <textarea
                className="resize-y overflow-auto w-2/3 mt-4 flex gap-6 p-2 border rounded text-xl"
                style={{ minHeight: "100px", whiteSpace: "pre-wrap" }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 30 minutes of yoga, 20 jumping jacks, 5 mile jog"
            />

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2 flex gap-2 items-start"
                onClick={handleSearch}
            >
                Submit
            </button>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            {results.length > 0 && (
                <div className="mt-6 flex gap-6 items-start">
                    <table className="border-collapse border w-2/3">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2 text-left">Exercise</th>
                                <th className="border p-2 text-left">MET</th>
                                <th className="border p-2 text-left">Duration</th>
                                <th className="border p-2 text-left">Calories Burned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((exercise, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2 capitalize">{exercise.name}</td>
                                    <td className="p-2">{exercise.met ?? "N/A"}</td>
                                    <td className="p-2">{exercise.duration_min} min</td>
                                    <td className="p-2">{Math.round(exercise.nf_calories)} kcal</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="w-1/3 p-4 text-lg font-semibold -mt-40">
                        Total Calories Burned: {Math.round(totalCalories)} kcal
                    </div>
                </div>
            )}
        </div>

    );
}
