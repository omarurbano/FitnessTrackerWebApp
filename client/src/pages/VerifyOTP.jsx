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
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Verify Your Email
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        An OTP has been sent to <span className="font-medium text-gray-900">{email}</span>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="otp" className="sr-only">Enter OTP</label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Enter OTP"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Verify OTP
                        </button>
                    </div>

                    {message && <p className="text-sm text-center text-green-600">{message}</p>}
                    {error && <p className="text-sm text-center text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
};
export default VerifyOTP;