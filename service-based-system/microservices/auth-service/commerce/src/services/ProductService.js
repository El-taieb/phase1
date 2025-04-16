import axios from 'axios';

const API_URL = 'http://localhost:5001/api/products'; // URL of your backend API

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products', error);
  }
};

// Create a new product
export const createProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error('Error creating product', error);
  }
};
