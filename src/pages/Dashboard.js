import React, { useContext } from 'react';
import AuthContext from '../store/authContext';
import AdminPanel from '../components/AdminPanel';
import './Dashboard.css';


const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <p>Welcome, {user && user.firstName}!</p>
            <button onClick={logout}>Logout</button>
            {user && user.role === 'Admin' && <AdminPanel />}
        </div>
    );
};

export default Dashboard;
