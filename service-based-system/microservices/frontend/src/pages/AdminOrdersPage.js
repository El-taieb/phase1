// src/pages/AdminOrdersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get('http://localhost:5001/api/orders')
      .then((res) => setOrders(res.data))
      .catch(() => alert('❌ Failed to load orders'));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await axios.put(`http://localhost:5001/api/orders/${id}`, { status: newStatus });
    fetchOrders();
  };

  return (
    <div className="main-container">
      <div className="nav">
        <a href="/admin">🔙 Back to Dashboard</a>
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</button>
      </div>
      <h2>📋 Manage Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="card">
          <p><strong>Product:</strong> {order.productId?.name || order.productId}</p>
          <p><strong>User:</strong> {order.userId?.username || order.userId}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
            <option value="pending">pending</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrdersPage;