import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email; // Get email from the state passed during navigation

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email) {
            setError("Email was not found. Please try signing up again.");
            return;
        }

        try {
            const response = await authService.verifyOTP(email, otp);
            if (response.data.verified) {
                setMessage("Email verified successfully!");
                setTimeout(() => navigate('/signin'), 2000);
            }
        } catch (err) {
            setError("An error occurred during OTP verification. Please try again.");
            console.error(err);
        }
    }
    return (
        <div>
            <h2> Verify Your Email</h2>
            <p> An OTP has been sent to {email}</p>
            <form onSubmit={handleVerifyOTP}>
                <input type="text" placeholde="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                <button type="submit">Verify OTP</button>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};
export default VerifyOTP;