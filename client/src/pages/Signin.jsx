import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await authService.signin(email, password);
            if (response.data.status === "SUCCESS" && response.data.validUser) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                navigate("/dashboard");
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSignin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign In</button>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
};
export default Signin;