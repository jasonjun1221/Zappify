import productService from "./productService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Create Product
export const createProduct = createAsyncThunk("product/createProduct", async (formData, thunkAPI) => {
  try {
    return await productService.createProduct(formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Products
export const getProducts = createAsyncThunk("product/getProducts", async (_, thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Product
export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id, thunkAPI) => {
  try {
    return await productService.deleteProduct(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Product created successfully.");
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = payload;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Product deleted successfully.");
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      });
  },
});

export default productSlice.reducer;
