// src/pages/ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import './main.css';

const ProductPage = () => {
  const { id } = useParams();
  return (
    <div className="main-container">
      <div className="nav">
        <a href="/">🏠 Back to Products</a>
        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</button>
      </div>
      <h2>🛒 Product Page</h2>
      <ReviewForm productId={id} />
      <ReviewList productId={id} />
    </div>
  );
};

export default ProductPage;