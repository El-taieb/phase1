// src/pages/AdminProductsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', image: '' });

  const fetchProducts = () => {
    axios.get('http://localhost:5001/api/products').then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/products', form);
      alert('✅ Product added');
      setForm({ name: '', description: '', price: '', category: '', image: '' });
      fetchProducts();
    } catch (err) {
      alert('❌ Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await axios.delete(`http://localhost:5001/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="main-container">
      <div className="nav">
        <a href="/admin">🔙 Back to Dashboard</a>
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</button>
      </div>
      <h2>📦 Manage Products</h2>

      <form onSubmit={handleAddProduct} className="card">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>

      <div>
        {products.map((p) => (
          <div key={p._id} className="card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>${p.price}</p>
            <p><strong>Category:</strong> {p.category}</p>
            {p.image && <img src={p.image} alt="Product" className="product-img" />}
            <button onClick={() => handleDelete(p._id)} style={{ backgroundColor: 'crimson' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
