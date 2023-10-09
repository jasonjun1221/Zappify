import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data.user;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data.user;
};

// Logout user
const logout = async () => {
  const response = await axios.get(`${API_URL}/users/logout`);
  return response.data.message;
};

// Login status
const loginStatus = async () => {
  const response = await axios.get(`${API_URL}/users/status`);
  return response.data;
};

// Get Profile
const getProfile = async () => {
  const response = await axios.get(`${API_URL}/users/profile`);
  return response.data.user;
};

// Update Profile
const updateProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/users/profile`, userData);
  return response.data.user;
};

// Update Password
const updatePassword = async (userData) => {
  const response = await axios.put(`${API_URL}/users/password`, userData);
  return response.data.user;
};

const authService = { register, login, logout, loginStatus, getProfile, updateProfile, updatePassword };

export default authService;
