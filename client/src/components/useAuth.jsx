import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUser({ email });
            setIsLoggedIn(true);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.signin(email, password);
            localStorage.setItem('userEmail', email);
            setUser({ email });
            setIsLoggedIn(true);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const signup = async (name, email, password) => {
        return authService.signup(name, email, password);
    };

    const verifyOTP = async (email, otp) => {
        try {
            const response = await authService.verifyOTP(email, otp);
            localStorage.setItem('userEmail', email);
            setUser({ email });
            setIsLoggedIn(true);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('userEmail');
        setUser(null);
        setIsLoggedIn(false);
    };

    return {
        user,
        userEmail: user?.email,
        isLoggedIn,
        login,
        signup,
        verifyOTP,
        logout
    };
};