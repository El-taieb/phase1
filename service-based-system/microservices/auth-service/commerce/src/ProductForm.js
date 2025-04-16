import React, { useState } from 'react';

function ProductForm({ fetchProducts }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, description, price };

    try {
      await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      setName('');
      setDescription('');
      setPrice('');

      // Refresh the list after adding a product
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
