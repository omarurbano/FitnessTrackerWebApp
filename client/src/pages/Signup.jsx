import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const response = await authService.signup(name, email, password);
            if (response.data.status === "SUCCESS") {
                setMessage(response.data.message);

                navigate('/verify-otp', {state: {email: email}});
            } else {
                setError(response.data.message);
            }
        }catch (err) {
            console.error(err);
            setError("An error occurred during signup. Please try again.");
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
export default Signup;