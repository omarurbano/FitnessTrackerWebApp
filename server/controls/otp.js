import { client } from '../db/connection.js';
import { generateOTP } from '../util/generateOTP.js';
import sendEmail from '../util/email.js';
import { dataHash, verifyHash } from '../util/dataHash.js';

const otpCollection = client.db("users").collection("otp");

export const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    await otpCollection.deleteOne({ email });
    const otp = generateOTP().toString();
    await sendEmail({ to: email, subject, html: `<p>${message}</p><b>${otp}</b>` });
    const hashedOTP = await dataHash(otp);
    const doc = { email, otp: hashedOTP, created_on: new Date(), expires_on: new Date(Date.now() + 3600000 * duration) };
    await otpCollection.insertOne(doc);
    return doc;
};

export const verifyOTP = async ({ email, otp }) => {
    const record = await otpCollection.findOne({ email });
    if (!record) throw new Error("OTP not found");
    if (record.expires_on < Date.now()) {
        await otpCollection.deleteOne({ email });
        throw new Error("OTP expired");
    }
    return await verifyHash(otp, record.otp);
};

export const deleteOTP = async (email) => {
    await otpCollection.deleteOne({ email });
};