import express from 'express';
import Meal from '../db/Meal.js';

const router = express.Router();

router.post('/save', async (req, res) => {
    try {
        const newMeal = new Meal({ foods: req.body.foods });
        await newMeal.save();
        res.status(201).json({ message: 'Meal saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save meal' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const meals = await Meal.find().sort({ createdAt: -1 });
        res.status(200).json(meals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch meals' });
    }
});

export default router;