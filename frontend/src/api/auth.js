import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/v1/users';
const API_URL = 'https://advanced-auth-mern-nextjs.onrender.com/api/v1/users';

export const signup = async userData => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};

export const verifyOTP = async otp => {
    const response = await axios.post(
        `${API_URL}/verify`,
        { otp },
        {
            withCredentials: true
        }
    );
    return response.data;
};

export const resendOTP = async () => {
    const response = await axios.post(
        `${API_URL}/resend-otp`,
        {},
        {
            withCredentials: true
        }
    );
    return response.data;
};

export const login = async credentials => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
};

// ✅ New function: Check if user is authenticated
export const isAuthenticated = async () => {
    try {
        const response = await axios.get(`${API_URL}/authenticated`, {
            withCredentials: true
        });
        return response?.data?.user ? true : false;
    } catch (error) {
        return false;
    }
};

export const forgotPassword = async email => {
    const response = await axios.post(`${API_URL}/forget-password`, {
        email
    });
    return response.data;
};

export const resetPassword = async resetData => {
    const response = await axios.post(`${API_URL}/reset-password`, resetData);
    return response.data;
};
