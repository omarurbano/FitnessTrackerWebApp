import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({
    food_name: String,
    serving_qty: Number,
    serving_unit: String,
    serving_weight_grams: Number,
    nf_calories: Number,
    nf_total_fat: Number,
    nf_saturated_fat: Number,
    nf_trans_fatty_acid: Number,
    nf_cholesterol: Number,
    nf_sodium: Number,
    nf_total_carbohydrate: Number,
    nf_dietary_fiber: Number,
    nf_sugars: Number,
    nf_protein: Number,
    photo: {
        thumb: String,
    },
    tags: {
        food_group: Number,
    },
});

const MealSchema = new mongoose.Schema({
    foods: [FoodItemSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Meal', MealSchema);
