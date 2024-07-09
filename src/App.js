import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './store/authContext';
import { AdminProvider } from './store/adminContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

const App = () => {
    return (
     
        <AuthProvider>
            <AdminProvider>
                <Router>
                  <div className="app-container">
                    <Routes>
                        <Route  path="/" element={<Home/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/dashboard" element={<Dashboard/>} />
                    </Routes>
                    </div>
                </Router>
            </AdminProvider>
        </AuthProvider>
      
    );
};

export default App;
