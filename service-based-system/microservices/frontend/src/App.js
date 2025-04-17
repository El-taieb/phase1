import React, { useState } from 'react';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

const App = () => {
  const [productId, setProductId] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛒 Product Review System</h2>
      <input
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        style={{ marginBottom: 20, display: 'block' }}
      />
      {productId && (
        <>
          <ReviewForm productId={productId} />
          <ReviewList productId={productId} />
        </>
      )}
    </div>
  );
};

export default App;
