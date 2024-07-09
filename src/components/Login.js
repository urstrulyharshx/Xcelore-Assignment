import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import AuthContext from '../store/authContext';
import './Login.css';

const Login = () => {
    const [message, setMessage] = useState(null);
    const { login } = useContext(AuthContext);
    const history = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async values => {
            const res = await login(values);
            if (res.error) {
                setMessage(res.error);
            } else {
                history.push('/dashboard');
            }
        }
    });

    return (
        <div className="login-container">
            
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={formik.handleSubmit} className="login-form">
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
