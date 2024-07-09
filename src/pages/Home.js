import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/authContext';
import './Home.css';

const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div  className="home-container">
            <h2>Home</h2>
            {isAuthenticated ? (
                <div>
                    <p>You are logged in!</p>
                    <Link to="/dashboard">Go to Dashboard</Link>
                </div>
            ) : (
                <div>
                    <p>Welcome to our application!</p>
                    <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
