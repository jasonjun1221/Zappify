import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Save Cart Items
const saveCartItems = async (cartData) => {
  const response = await axios.post(`${API_URL}/users/save-cart`, cartData);
  return response.data;
};

// Get Cart Items
const getCartItems = async () => {
  const response = await axios.get(`${API_URL}/users/get-cart`);
  return response.data.cartItems;
};

const cartService = { saveCartItems, getCartItems };

export default cartService;
