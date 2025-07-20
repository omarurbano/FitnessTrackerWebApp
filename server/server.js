import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import UserRouter from "./routes/user.js";
import contactUs from "./routes/contactus.js";
import mealRoutes from "./routes/meal.js";
import workoutRoutes from "./routes/workout.js"
import reply from "./routes/reply.js"
import './db/connection.js';
import './db/mongoose-connection.js'

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/user", UserRouter);
app.use("/contactus", contactUs);
app.use("/meal", mealRoutes);
app.use("/workout", workoutRoutes);
app.use("/sendreply", reply)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
