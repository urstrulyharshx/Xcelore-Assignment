import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        return { error: error.response.data.msg };
    }
};

const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        return { error: error.response.data.msg };
    }
};

const getUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    } catch (error) {
        return { error: error.response.data.msg };
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login,
    getUser
};
