import mongoose from 'mongoose';

const ExerciseItemSchema = new mongoose.Schema({
    name: String,
    met: Number,
    duration_min: Number,
    nf_calories: Number,
});

const WorkoutSchema = new mongoose.Schema({
    exercises: [ExerciseItemSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Workout', WorkoutSchema);
