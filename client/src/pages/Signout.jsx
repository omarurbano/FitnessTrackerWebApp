import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/useAuth";

const Logout = () => {
    const { logout, userEmail, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        const timer = setTimeout(() => {
            navigate("/");
        }, 2000);

        return () => clearTimeout(timer);
    }, [logout, navigate]);

    return (
        <div className="p-4 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Logging Out</h2>
            {isLoggedIn ? (
                <p className="text-gray-600">Goodbye {userEmail}! You have been logged out.</p>
            ) : (
                <p className="text-gray-600">You have been logged out successfully.</p>
            )}
            <p className="text-sm text-gray-500 mt-4">Redirecting to home page...</p>
        </div>
    );
};

export default Logout;