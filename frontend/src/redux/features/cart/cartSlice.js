import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { shortenText } from "../../../utils/utils";
import cartService from "./cartService";

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  totalQuantity: 0,
  totalPrice: 0,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Save Cart Items
export const saveCartItems = createAsyncThunk("cart/saveCartItems", async (cartData, thunkAPI) => {
  try {
    return await cartService.saveCartItems(cartData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Cart Items
export const getCartItems = createAsyncThunk("cart/getCartItems", async (_, thunkAPI) => {
  try {
    return await cartService.getCartItems();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Find item in cart
      const existItem = state.cartItems.find((item) => item._id === newItem._id);

      // if item does not exist in cart, add item to cart
      if (!existItem) {
        state.cartItems.push({ ...newItem, cartQuantity: 1 });
        toast.success(`${shortenText(newItem.name, 8)} added to cart.`, { position: "bottom-right" });
      } else {
        // if item exceeds quantity, show error
        if (existItem.cartQuantity === existItem.quantity) {
          toast.error("Maximum quantity reached.", { position: "bottom-right" });
          return;
        }

        // if item exists in cart, increase quantity by 1
        existItem.cartQuantity++;
        toast.success(`${shortenText(newItem.name, 8)} increased by 1.`, { position: "bottom-right" });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      // Find item in cart
      const existItem = state.cartItems.find((item) => item._id === action.payload._id);

      // If item quantity is equal to 1, remove item from cart
      if (existItem.cartQuantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
        toast.success(`${shortenText(action.payload.name, 8)} removed from cart.`, { position: "bottom-right" });
        return;
      }

      // If item quantity is greater than 1, decrease quantity by 1
      existItem.cartQuantity--;
      toast.success(`${shortenText(action.payload.name, 8)} decreased by 1.`, { position: "bottom-right" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      // Find item in cart
      const existItem = state.cartItems.find((item) => item._id === action.payload._id);

      // If item quantity is equal to cart quantity, show error
      if (existItem.cartQuantity === existItem.quantity) {
        toast.error("Maximum quantity reached.", { position: "bottom-right" });
        return;
      }

      // If item quantity is less than cart quantity, increase quantity by 1
      existItem.cartQuantity++;
      toast.success(`${shortenText(action.payload.name, 8)} increased by 1.`, { position: "bottom-right" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
      toast.success("Item removed from cart.");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    calculateTotalQuantity: (state) => {
      state.totalQuantity = state.cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
    },
    calculateTotalPrice: (state, action) => {
      if (!action.payload) {
        state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
      } else {
        const originalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
        state.totalPrice = originalPrice - (originalPrice * action.payload?.discount) / 100;
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      // Save Cart Items
      .addCase(saveCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveCartItems.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log("Cart items saved successfully.");
      })
      .addCase(saveCartItems.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Get Cart Items
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartItems = payload;
        localStorage.setItem("cartItems", JSON.stringify(payload));
      })
      .addCase(getCartItems.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      });
  },
});

export const { addToCart, decreaseQuantity, increaseQuantity, removeFromCart, calculateTotalQuantity, calculateTotalPrice, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
