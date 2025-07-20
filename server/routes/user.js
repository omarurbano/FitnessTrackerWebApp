import express from 'express';
import bcrypt from 'bcrypt';
import { client } from '../db/connection.js';
import { sendVerificationEmail, verifyEmail } from '../controls/emailVerification.js';
import { ObjectId } from "mongodb";

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
        const newUser = { name, email, password: hashedPassword, verified: false, role: 'user' };
        await collection.insertOne(newUser);
        await sendVerificationEmail({ email });

        res.json({
            status: "SUCCESS",
            message: "Signup successful! Please check your email for verification.",
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
            data: { name: user.name, email: user.email, role: user.role },
            validUser: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "FAILED", message: "Error occurred during sign-in", validUser: false });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        await verifyEmail({ email, otp });
        res.json({ email, verified: true });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//For admin user to lookup a user
router.get('/:email', async (req, res) => {
    let query = { email: req.params.email };
    let result = await collection.findOne(query);
    if(!result)
    {
        res.send("Not found").status(404);
    }
    res.send(result).status(200);
})

router.patch('/:email', async (req, res) => {
    try {
        const query = { email: req.params.email };
        const {uName, uEmail, uPassword, password} = req.body;
        const updates = {
            $set: {}
        };

        const passwordMatch = await bcrypt.compare(password, uPassword);
        if (passwordMatch)
        {
            updates.$set.name = uName;
            updates.$set.password = password;
            updates.$set.email = uEmail;
        }
        else
        {
            updates.$set.name = uName;
            updates.$set.password = await bcrypt.hash(uPassword, 10);
            updates.$set.email = uEmail;
        }

        
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);

    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
})

export default router;
