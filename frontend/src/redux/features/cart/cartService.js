import axios from "axios";

// Save Cart Items
const saveCartItems = async (cartData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/save-cart`, cartData);
  return response.data;
};

// Get Cart Items
const getCartItems = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/get-cart`);
  return response.data.cartItems;
};

const cartService = { saveCartItems, getCartItems };

export default cartService;
