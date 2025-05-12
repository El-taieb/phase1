// src/pages/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="nav">
        <a href="/">🏠 Back to Home</a>
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</button>
      </div>
      <h2>🛠️ Admin Dashboard</h2>
      <div className="card">
        <button onClick={() => navigate('/admin/products')}>📦 Manage Products</button>
        <button onClick={() => navigate('/admin/orders')}>📋 Manage Orders</button>
        <button onClick={() => navigate('/admin/users')}>👤 View Users</button>
      </div>
    </div>
  );
};

export default AdminDashboard;