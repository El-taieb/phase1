// src/pages/MyOrdersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`http://localhost:5001/api/orders/${userId}`)
      .then((res) => setOrders(res.data))
      .catch(() => alert('❌ Failed to load orders'));
  }, [userId]);

  return (
    <div className="main-container">
      <div className="nav">
        <a href="/">🏠 Back to Products</a>
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</button>
      </div>
      <h2>📦 My Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        orders.map((order) => (
          <div key={order._id} className="card">
            {order.productId?.image && <img src={order.productId.image} alt="" className="product-img" />}
            <p><strong>Product:</strong> {order.productId?.name || order.productId}</p>
            <p><strong>Category:</strong> {order.productId?.category || 'N/A'}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrdersPage;