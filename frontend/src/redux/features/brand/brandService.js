import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Create Brand
const createBrand = async (formData) => {
  const response = await axios.post(`${API_URL}/brands/`, formData);
  return response.data;
};

// Get Brands
const getBrands = async () => {
  const response = await axios.get(`${API_URL}/brands/`);
  return response.data.brands;
};

// Delete Brand
const deleteBrand = async (slug) => {
  const response = await axios.delete(`${API_URL}/brands/${slug}`);
  return response.data;
};

const brandService = { createBrand, getBrands, deleteBrand };

export default brandService;
