//using https://www.fda.gov/media/81606/download and nutritionix api as reeference
import React from "react";

export const styles = {
    root: {
        display: "flex",
        flexFlow: "column",
        padding: 12,
        backgroundColor: "white",
        border: "1px solid black",
        boxShadow: "4px 4px 8px 0px rgba(0,0,0,0.25)",
        fontFamily: "'Libre Franklin', sans-serif",
        width: 300,
        color: "black",
        userSelect: "none",
    },
    header: {
        fontWeight: 900,
        fontSize: 24,
    },
    SevenPtDivider: {
        borderTop: "7px solid black",
        margin: "1px 0",
      },
    ThreePtDivider: {
        borderTop: "3px solid black",
        margin: "1px 0",
    },
    QuarterPtDivider: {
        borderTop: "0.25px solid black",
        margin: "1px 0",
    },
    calories: {
        fontWeight: 900,
        fontSize: 22,
        display: "flex",
        justifyContent: "space-between",
    },
    nutrientRow: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        fontWeight: 500,
    },
    nutrientRowBold: {
        fontWeight: 700,
    },
    dvPercent: {
        marginLeft: 8,
        fontWeight: 600,
        fontSize: 13,
    },
    footer: {
        fontSize: 10,
        fontWeight: 700,
        marginTop: 12,
        textAlign: "center",
        fontStyle: "italic",
        color: "#444",
    },
};

//FDA DVs taken from https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels
const DAILY_VALUES = {
    totalFat: 78, // g
    saturatedFat: 20, // g
    cholesterol: 300, // mg
    sodium: 2300, // mg
    totalCarbohydrate: 275, // g
    dietaryFiber: 28, // g
    sugars: 50, // g
    protein: 50, // g
    calcium: 1300, // mg
    iron: 18, // mg
    potassium: 4700, // mg
    vitaminD: 20, // mcg
};

function getPercentDV(nutrient, value) {
    const dv = DAILY_VALUES[nutrient];
    if (!dv || value == null) return null;
    return Math.round((value / dv) * 100);
}

export default function NutritionLabel({ data }) {
    if (!data) return null;

    const nutrients = [
        { label: "Total Fat", key: "totalFat", unit: "g", bold: true },
        { label: "Saturated Fat", key: "saturatedFat", unit: "g" },
        { label: "Trans Fat", key: "transFat", unit: "g" },
        { label: "Cholesterol", key: "cholesterol", unit: "mg" },
        { label: "Sodium", key: "sodium", unit: "mg" },
        { label: "Total Carbohydrate", key: "totalCarbohydrate", unit: "g", bold: true },
        { label: "Dietary Fiber", key: "dietaryFiber", unit: "g" },
        { label: "Sugars", key: "sugars", unit: "g" },
        { label: "Protein", key: "protein", unit: "g" },
    ];

    return (
        <div style={styles.root}>
            <div style={styles.header}>Nutrition Facts</div>

            <div style={{ ...styles.nutrientRow, ...styles.nutrientRowBold }}>
                {/*for some reason things dont render without this useless block */}
            </div>

            <div style={styles.QuarterPtDivider} />
            <div style={styles.SevenPtDivider} />

            <div style={{ ...styles.nutrientRow, ...styles.nutrientRowBold, marginBottom: -3, }}>
                <span>Amount Per Serving</span>
            </div>

            <div style={styles.calories}>
                <span>Calories</span>
                <span>{data.calories || 0}</span>
            </div>

            <div style={styles.ThreePtDivider} />

            <div style={{ ...styles.nutrientRow, ...styles.nutrientRowBold }}>
                <span>Total Fat {data.totalFat ?? 0}g</span>
                <span style={styles.dvPercent}>{getPercentDV("totalFat", data.totalFat)}%</span>
            </div>
            <div style={styles.QuarterPtDivider} />

            <div style={styles.nutrientRow}>
                <span style={{ paddingLeft: 4 }}>Saturated Fat {data.saturatedFat ?? 0}g</span>
                <span style={styles.dvPercent}>{getPercentDV("saturatedFat", data.saturatedFat)}%</span>
            </div>
            <div style={styles.QuarterPtDivider} />

            <div style={styles.nutrientRow}>
                <span style={{ paddingLeft: 4 }}>Trans Fat {data.transFat ?? 0}g</span>
            </div>
            <div style={styles.QuarterPtDivider} />

            <div style={{ ...styles.nutrientRow, ...styles.nutrientRowBold }}>
                <span>Cholesterol {data.cholesterol ?? 0}mg</span>
                <span style={styles.dvPercent}>{getPercentDV("cholesterol", data.cholesterol)}%</span>
            </div>
            <div style={styles.QuarterPtDivider} />

            <div style={{ ...styles.nutrientRow, ...styles.nutrientRowBold }}>
                <span>Sodium {data.sodium ?? 0}mg</span>
                <span style={styles.dvPercent}>{getPercentDV("sodium", data.sodium)}%</span>
            </div>
            <div style={styles.QuarterPtDivider} />

            <div style={{ ...styles.nutrientRow, ...styles.nutrientRowBold }}>
                <span>Total Carbohydrate {data.totalCarbohydrate ?? 0}g</span>
                <span style={styles.dvPercent}>{getPercentDV("totalCarbohydrate", data.totalCarbohydrate)}%</span>
            </div>
            <div style={styles.QuarterPtDivider} />

            <div style={styles.nutrientRow}>
                <span style={{ paddingLeft: 4 }}>Dietary Fiber {data.dietaryFiber ?? 0}g</span>
                <span style={styles.dvPercent}>{getPercentDV("dietaryFiber", data.dietaryFiber)}%</span>
            </div>
            <div style={styles.QuarterPtDivider} />

            <div style={styles.nutrientRow}>
                <span style={{ paddingLeft: 4 }}>Sugars {data.sugars ?? 0}g</span>
            </div>
            <div style={styles.QuarterPtDivider} />

            <div style={{ ...styles.nutrientRow, ...styles.nutrientRowBold }}>
                <span>Protein {data.protein ?? 0}g</span>
                <span style={styles.dvPercent}>{getPercentDV("protein", data.protein)}%</span>
            </div>

            <div style={styles.SevenPtDivider} />

            <div style={styles.footer}>
                % Daily Values are based on a 2,000 calorie diet.
            </div>
        </div>
    );
}
