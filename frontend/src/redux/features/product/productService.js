import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Create Product
const createProduct = async (formData) => {
  const response = await axios.post(`${API_URL}/products/`, formData);
  return response.data;
};

// Get Products
const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products/`);
  return response.data.products;
};

// Get Product
const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data.product;
};

// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.put(`${API_URL}/products/${id}`, formData);
  return response.data;
};

// Delete Product
const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

const productService = { createProduct, getProducts, getProduct, updateProduct, deleteProduct };

export default productService;
