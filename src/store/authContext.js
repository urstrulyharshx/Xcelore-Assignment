import React, { createContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                loading: false
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const loadUser = async () => {
            if (localStorage.token) {
                const res = await authService.getUser(localStorage.token);
                if (!res.error) {
                    dispatch({ type: 'USER_LOADED', payload: res });
                } else {
                    dispatch({ type: 'AUTH_ERROR' });
                }
            } else {
                dispatch({ type: 'AUTH_ERROR' });
            }
        };

        loadUser();
    }, []);

    const register = async (formData) => {
        const res = await authService.register(formData);
        if (!res.error) {
            dispatch({ type: 'REGISTER_SUCCESS', payload: res });
        } else {
            return res;
        }
    };

    const login = async (formData) => {
        const res = await authService.login(formData);
        if (!res.error) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: res });
        } else {
            return res;
        }
    };

    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
