import axios from "axios";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/register`, userData);
  return response.data.user;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/login`, userData);
  return response.data.user;
};

// Logout user
const logout = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/logout`);
  return response.data.message;
};

// Login status
const loginStatus = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/status`);
  return response.data;
};

// Get Profile
const getProfile = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/profile`);
  return response.data.user;
};

// Update Profile
const updateProfile = async (userData) => {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/users/profile`, userData);
  return response.data.user;
};

// Update Password
const updatePassword = async (userData) => {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/users/password`, userData);
  return response.data.user;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users`);
  return response.data.users;
};

// Block User
const blockUser = async (id) => {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/users/block/${id}`);
  return response.data.message;
};

const authService = { register, login, logout, loginStatus, getProfile, updateProfile, updatePassword, getUsers, blockUser };

export default authService;
