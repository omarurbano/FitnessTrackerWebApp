import express from "express";
import sendEmail from '../util/email.js';

const router = express.Router();

router.post("/", async (req, res) => {
    const {email, response, option} = req.body;

    try {
        await sendEmail({ to: email, subject: "CoreTrack Follow Up To Outreach Regarding " + option, html: `<p>${response}</p>` });
        res.status(200).json({success: true, message: "Email sent"});

    }
    catch(error){
        res.status(500).json(error);
    }
})

export default router;