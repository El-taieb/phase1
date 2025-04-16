import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import OrderForm from './OrderForm';
import ProductForm from './ProductForm';

import './App.css'; // For styling

function App() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Management Dashboard</h1>
      <div className="forms-container">
        <div className="form-section">
          <ProductForm fetchProducts={fetchProducts} />
          <UserForm fetchUsers={fetchUsers} />
          <OrderForm fetchOrders={fetchOrders} />
        </div>

        <div className="display-sections">
          <section className="product-section">
            <h2>Products</h2>
            <div className="items-list">
              {products.map((product) => (
                <div key={product._id} className="item-card">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="user-section">
            <h2>Users</h2>
            <div className="items-list">
              {users.map((user) => (
                <div key={user._id} className="item-card">
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="order-section">
            <h2>Orders</h2>
            <div className="items-list">
              {orders.map((order) => (
                <div key={order._id} className="item-card">
                  <h3>Order for Product: {order.productId.name}</h3>
                  <p>User: {order.userId.username}</p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Total Price: ${order.totalPrice}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
