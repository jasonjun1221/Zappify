import brandService from "./brandService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Create Brand
export const createBrand = createAsyncThunk("brand/createBrand", async (formData, thunkAPI) => {
  try {
    return await brandService.createBrand(formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Brands
export const getBrands = createAsyncThunk("brand/getBrands", async (_, thunkAPI) => {
  try {
    return await brandService.getBrands();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Brand
export const deleteBrand = createAsyncThunk("brand/deleteBrand", async (slug, thunkAPI) => {
  try {
    return await brandService.deleteBrand(slug);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Create Brand
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Brand created successfully.");
      })
      .addCase(createBrand.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Get Brands
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = payload;
      })
      .addCase(getBrands.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Delete Brand
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Brand deleted successfully.");
      })
      .addCase(deleteBrand.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      }),
});

export default brandSlice.reducer;
