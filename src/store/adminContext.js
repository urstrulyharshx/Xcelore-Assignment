import React, { createContext, useReducer } from 'react';
import userService from '../services/userService';
import AuthContext from './authContext';

const AdminContext = createContext();

const adminReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload._id ? action.payload : user)
            };
        case 'DELETE_USER':
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };
        default:
            return state;
    }
};

export const AdminProvider = ({ children }) => {
    const { token } = React.useContext(AuthContext);

    const initialState = {
        users: [],
        loading: true
    };

    const [state, dispatch] = useReducer(adminReducer, initialState);

    const getUsers = async () => {
        const res = await userService.getUsers(token);
        if (!res.error) {
            dispatch({ type: 'GET_USERS', payload: res });
        }
    };

    const updateUser = async (id, formData) => {
        const res = await userService.updateUser(id, formData, token);
        if (!res.error) {
            dispatch({ type: 'UPDATE_USER', payload: res });
        }
    };

    const deleteUser = async (id) => {
        const res = await userService.deleteUser(id, token);
        if (!res.error) {
            dispatch({ type: 'DELETE_USER', payload: id });
        }
    };

    return (
        <AdminContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                getUsers,
                updateUser,
                deleteUser
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContext;
