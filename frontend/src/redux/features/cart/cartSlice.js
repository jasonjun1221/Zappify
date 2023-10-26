import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  totalPrice: 0,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Find item in cart
      const existItem = state.cartItems.find((item) => item._id === newItem._id);

      // If item already exists in cart, increase quantity
      if (existItem) {
        // If item quantity is equal to cart quantity, show error
        if (existItem.cartQuantity === existItem.quantity) {
          toast.error("Maximum quantity reached.", { position: "top-center" });
          return;
        }
        existItem.cartQuantity++;
      } else {
        // If item doesn't exist in cart, add item to cart
        state.cartItems.push({ ...newItem, cartQuantity: 1 });
        toast.success("Item added to cart.", { position: "top-center" });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      // Find item in cart
      const existItem = state.cartItems.find((item) => item._id === action.payload._id);

      // If item quantity is 1, remove item from cart
      if (existItem.cartQuantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
        toast.success("Item removed from cart.", { position: "top-center" });
      }

      // If item quantity is greater than 1, decrease quantity
      existItem.cartQuantity--;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      // Find item in cart
      const existItem = state.cartItems.find((item) => item._id === action.payload._id);

      // If item quantity is equal to cart quantity, show error
      if (existItem.cartQuantity === existItem.quantity) {
        toast.error("Maximum quantity reached.", { position: "top-center" });
        return;
      }

      // If item quantity is less than cart quantity, increase quantity
      existItem.cartQuantity++;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
      toast.success("Item removed from cart.", { position: "top-center" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
    },
  },
});

export const { addToCart, decreaseQuantity, increaseQuantity, removeFromCart, calculateTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
