import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.signin(email, password);
            if (response.data.status === "SUCCESS" && response.data.validUser) {
                const userData = response.data.data;
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
            }
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
        localStorage.removeItem('user');
        setUser(null);
    };

    return {
        user,
        userEmail: user?.email,
        isLoggedIn: !!user,
        login,
        signup,
        verifyOTP,
        logout
    };
};