import React, { useState } from "react";
import axios from "axios";
import NutritionLabel from "./NutritionLabel";

export default function NutritionAPI() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [renderKey, setRenderKey] = useState(0);

    const APP_ID = "5c311b3a";
    const APP_KEY = "a1b49a0a6a84533092f2f6bbf7f9224e";

    // Food group ID to name mapping
    const foodGroupMap = {
        1: "Dairy and Egg Products",
        2: "Spices and Herbs",
        3: "Baby Foods",
        4: "Fats and Oils",
        5: "Poultry Products",
        6: "Soups, Sauces, and Gravies",
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
        17: "Lamb, Veal, and Game Products",
        18: "Baked Products",
        19: "Sweets",
        20: "Cereal Grains and Pasta",
        21: "Fast Foods",
        22: "Meals, Entrees, and Side Dishes",
        23: "Snacks",
        24: "American Indian/Alaska Native Foods",
        25: "Restaurant Foods"
    };

    const getFoodGroupName = (id) => {
        return foodGroupMap[id] || 'N/A';
    };

    const handleSearch = async () => {
        try {
            const res = await axios.post(
                "https://trackapi.nutritionix.com/v2/natural/nutrients",
                { query },
                {
                    headers: {
                        "x-app-id": APP_ID,
                        "x-app-key": APP_KEY,
                        "x-remote-user-id": "0",
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Foods returned:", res.data.foods);
            setResults(res.data.foods);
            setRenderKey(prev => prev + 1);
            setError("");
        } catch (err) {
            setError("Something went wrong.");
            console.error(err);
        }
    };

    // get totals
    const totals = results.reduce(
        (acc, food) => {
            acc.calories += food.nf_calories || 0;
            acc.totalFat += food.nf_total_fat || 0;
            acc.saturatedFat += food.nf_saturated_fat || 0;
            acc.transFat += food.nf_trans_fatty_acid || 0;
            acc.cholesterol += food.nf_cholesterol || 0;
            acc.sodium += food.nf_sodium || 0;
            acc.totalCarbohydrate += food.nf_total_carbohydrate || 0;
            acc.dietaryFiber += food.nf_dietary_fiber || 0;
            acc.sugars += food.nf_sugars || 0;
            acc.protein += food.nf_protein || 0;
            return acc;
        },
        {
            calories: 0,
            totalFat: 0,
            saturatedFat: 0,
            transFat: 0,
            cholesterol: 0,
            sodium: 0,
            totalCarbohydrate: 0,
            dietaryFiber: 0,
            sugars: 0,
            protein: 0,
        }
    );

    const nutritionData = {
        servingSize: `${results.length} item(s)`,
        servingsPerContainer: 1,
        calories: Math.round(totals.calories) || 0,
        totalFat: Math.round(totals.totalFat) || 0,
        saturatedFat: Math.round(totals.saturatedFat) || 0,
        transFat: Math.round(totals.transFat) || 0,
        cholesterol: Math.round(totals.cholesterol) || 0,
        sodium: Math.round(totals.sodium) || 0,
        totalCarbohydrate: Math.round(totals.totalCarbohydrate) || 0,
        dietaryFiber: Math.round(totals.dietaryFiber) || 0,
        sugars: Math.round(totals.sugars) || 0,
        protein: Math.round(totals.protein) || 0,
        vitaminD: 0,
        calcium: 0,
        iron: 0,
        potassium: 0,
    };
      
    console.log(nutritionData)
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Nutrition Lookup</h2>

            <input
                className="border p-2 w-full my-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 1 apple and 2 eggs"
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSearch}
            >
                Search
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            <p>Total results: {results.length}</p>

            <div key={renderKey}>
                {results.length > 0 && (
                    <table className="mt-4 w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Qty</th>
                                <th className="border p-2">Unit</th>
                                <th className="border p-2">Food</th>
                                <th className="border p-2">Calories</th>
                                <th className="border p-2">Weight (g)</th>
                                <th className="border p-2">Food Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((food, i) => (
                                <tr key={`${food.food_name}-${i}`} className="border">
                                    <td className="border p-2">{food.serving_qty ?? 'N/A'}</td>
                                    <td className="border p-2">{food.serving_unit ?? 'N/A'}</td>
                                    <td className="border p-2">{food.food_name}</td>
                                    <td className="border p-2">{food.nf_calories ?? 'N/A'}</td>
                                    <td className="border p-2">{food.serving_weight_grams ?? 'N/A'}</td>
                                    <td className="border p-2">
                                        {getFoodGroupName(food.tags?.food_group)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {/* for some reason we need both of these IDK why but its just how it is */}
            <div className="mt-8 p-4 border-t font-semibold">
                <h3 className="text-lg mb-2">Total Nutrition</h3>
                <div className="mt-4 max-w-md border border-black bg-white p-4 text-black">
                    <NutritionLabel data={nutritionData} />
                </div>
            </div>
            {results.length >= 1 && (
                <div className="mt-8 p-4 border-t font-semibold">
                    <h3 className="text-lg mb-2">Total Nutrition</h3>
                    <div className="mt-4 max-w-md border border-black bg-white p-4 text-black">
                        <NutritionLabel data={nutritionData} />
                    </div>
                </div>
            )}
        </div>
    );    
}