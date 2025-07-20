import express from 'express';
import Workout from '../db/Workout.js';

const router = express.Router();

router.post('/save', async (req, res) => {
    try {
        const newWorkout = new Workout({ 
            exercises: req.body.exercises,
            user: req.body.user,
        });
        await newWorkout.save();
        res.status(201).json({ message: 'Workout saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save workout' });
    }
});

router.get('/all/:userEmail', async (req, res) => {
    try {
        const { userEmail } = req.params;
        const workouts = await Workout.find({ user: userEmail }).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch users workouts' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch workouts' });
    }
});

export default router;
