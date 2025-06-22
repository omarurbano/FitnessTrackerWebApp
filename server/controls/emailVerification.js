import { client } from '../db/connection.js';
import { sendOTP, verifyOTP, deleteOTP } from './otp.js';

const collection = client.db("users").collection("info");

export const sendVerificationEmail = async ({ email }) => {
    const user = await collection.findOne({ email });
    if (!user) throw new Error("User not found");
    return await sendOTP({ email, subject: "Verify Email", message: "Verify email using the OTP below.", duration: 1 });
};

export const verifyEmail = async ({ email, otp }) => {
    const valid = await verifyOTP({ email, otp });
    if (!valid) throw new Error("Invalid OTP");
    await collection.updateOne({ email }, { $set: { verified: true } });
    await deleteOTP(email);
};