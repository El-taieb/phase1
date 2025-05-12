// src/pages/ProductsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  axios.get('http://localhost:5001/api/products')
    .then((res) => setProducts(res.data))
    .catch(() => alert('❌ Failed to fetch products'));

  const isAdminValue = localStorage.getItem('isAdmin');
  if (isAdminValue && isAdminValue === 'true') {
    setIsAdmin(true);
  }
}, []);


  const buyProduct = async (productId) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post('http://localhost:5001/api/orders', { userId, productId });
      alert('✅ Product ordered');
    } catch {
      alert('❌ Failed to place order');
    }
  };

  return (
    <div className="main-container">
      <div className="nav">
        <a href="/my-orders">📃 My Orders</a>
        {isAdmin && <a href="/admin">🛠️ Admin Dashboard</a>}
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</button>
      </div>
      <h2>🛍️ All Products</h2>

      {products.map((p) => (
        <div key={p._id} className="card">
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p><strong>${p.price}</strong></p>
          <button onClick={() => navigate(`/product/${p._id}`)}>View</button>
          <button onClick={() => buyProduct(p._id)}>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;