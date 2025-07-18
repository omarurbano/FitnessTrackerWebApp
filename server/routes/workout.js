import express from 'express';
import Workout from '../db/Workout.js';

const router = express.Router();

router.post('/save', async (req, res) => {
    try {
        const newWorkout = new Workout({ exercises: req.body.exercises });
        await newWorkout.save();
        res.status(201).json({ message: 'Workout saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save workout' });
    }
});

export default router;
