import axios from 'axios';

const API_URL = 'http://localhost:5050/';

// Function to handle user signup requests
const signup = (name, email, password) => {
    return axios.post(API_URL + 'user/signup', {
        name,
        email,
        password
    });
};

// Function to handle user signin requests
// This function sends a POST request to the server with the user's email and password
const signin = (email, password) => {
    return axios.post(API_URL + 'user/signin', {
        email,
        password
    });
}

// Function to verify the OTP sent to the user's email
// This function sends a POST request to the server with the user's email and the OTP
const verifyOTP = (email, otp) => {
    return axios.post(API_URL + 'user/verify-otp', {
        email,
        otp
    });
}

// Exporting the authService object containing the functions
// This allows other parts of the application to use these functions for authentication
const authService = {
    signup,
    signin,
    verifyOTP
};

export default authService;