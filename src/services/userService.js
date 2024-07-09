import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const getUsers = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    } catch (error) {
        return { error: error.response.data.msg };
    }
};

const updateUser = async (id, userData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, userData, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    } catch (error) {
        return { error: error.response.data.msg };
    }
};

const deleteUser = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: { 'x-auth-token': token }
        });
        return response.data;
    } catch (error) {
        return { error: error.response.data.msg };
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUsers,
    updateUser,
    deleteUser
};
