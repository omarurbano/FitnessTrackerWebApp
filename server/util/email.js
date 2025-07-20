import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { AUTH_EMAIL, APP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: AUTH_EMAIL, pass: APP_PASSWORD },
});

const sendEmail = async (emailOptions) => {
    await transporter.sendMail(emailOptions);
};

export default sendEmail;
