// src/pages/AdminUsersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/users')
      .then((res) => setUsers(res.data))
      .catch(() => alert('❌ Failed to load users'));
  }, []);

  return (
    <div className="main-container">
      <div className="nav">
        <a href="/admin">🔙 Back to Dashboard</a>
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</button>
      </div>
      <h2>👤 Registered Users</h2>

      {users.map((user) => (
        <div key={user._id} className="card">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminUsersPage;