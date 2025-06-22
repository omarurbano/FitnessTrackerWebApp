import express from 'express';
import bcrypt from 'bcrypt';
import { client } from '../db/connection.js';

const router = express.Router();
const usersDb = client.db('users');
const collection = usersDb.collection('info');

// Sign Up Route
router.post('/signup', async (req, res) => {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!name || !email || !password) {
        return res.json({ status: "FAILED", message: "Input field is empty!" });
    }

    if (!/^[a-zA-Z ]*$/.test(name)) {
        return res.json({ status: "FAILED", message: "Invalid name entry!" });
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({ status: "FAILED", message: "Invalid email entry!" });
    }

    if (password.length < 8) {
        return res.json({ status: "FAILED", message: "Password needs a minimum of 8 characters!" });
    }

    try {
        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            return res.json({ status: "FAILED", message: "Email already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPassword };

        const result = await collection.insertOne(newUser);

        res.json({
            status: "SUCCESS",
            message: "Signup successful!",
            data: result,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "FAILED", message: "An error occurred during signup." });
    }
});

// Sign In Route
router.post('/signin', async (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
        return res.json({ status: "FAILED", message: "No entry provided!", validUser: false });
    }

    try {
        const user = await collection.findOne({ email });

        if (!user) {
            return res.json({ status: "FAILED", message: "Invalid credentials", validUser: false });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.json({ status: "FAILED", message: "Incorrect password", validUser: false });
        }

        res.json({
            status: "SUCCESS",
            message: "Signed in successfully!",
            data: { name: user.name, email: user.email },
            validUser: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "FAILED", message: "Error occurred during sign-in", validUser: false });
    }
});

export default router;
