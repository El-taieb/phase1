// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminUsersPage from './pages/AdminUsersPage';

function App() {
  const isLoggedIn = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <ProductsPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/admin" element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/admin/products" element={isLoggedIn && isAdmin ? <AdminProductsPage /> : <Navigate to="/" />} />
        <Route path="/admin/orders" element={isLoggedIn && isAdmin ? <AdminOrdersPage /> : <Navigate to="/" />} />
        <Route path="/admin/users" element={isLoggedIn && isAdmin ? <AdminUsersPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;