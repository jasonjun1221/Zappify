import axios from "axios";

export const API_URL = `http://localhost:5000/api`;

// Create Order
const createOrder = async (formData) => {
  const response = await axios.post(`${API_URL}/orders/`, formData);
  return response.data.message;
};

// Get Orders
const getOrders = async () => {
  const response = await axios.get(`${API_URL}/orders/`);
  return response.data.orders;
};

// Get My Orders
const getMyOrders = async () => {
  const response = await axios.get(`${API_URL}/orders/myorders`);
  return response.data.orders;
};

// Get Order By Id
const getOrderById = async (id) => {
  const response = await axios.get(`${API_URL}/orders/${id}`);
  return response.data.order;
};

// Update Order Status
const updateOrderStatus = async (id, orderStatus) => {
  const response = await axios.put(`${API_URL}/orders/${id}`, { orderStatus });
  return response.data.message;
};

const orderService = { createOrder, getOrders, getMyOrders, getOrderById, updateOrderStatus };

export default orderService;
