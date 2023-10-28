import authService from "./authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  isError: false,
  isLoggedIn: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await authService.register(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await authService.login(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Login status
export const loginStatus = createAsyncThunk("auth/loginStatus", async (_, thunkAPI) => {
  try {
    return await authService.loginStatus();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Profile
export const getProfile = createAsyncThunk("auth/getProfile", async (_, thunkAPI) => {
  try {
    return await authService.getProfile();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Profile
export const updateProfile = createAsyncThunk("auth/updateProfile", async (userData, thunkAPI) => {
  try {
    return await authService.updateProfile(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Password
export const updatePassword = createAsyncThunk("auth/updatePassword", async (userData, thunkAPI) => {
  try {
    return await authService.updatePassword(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = payload;
        toast.success("Registration successfully.");
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
        toast.error(payload);
      })
      // Login user
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = payload;
        toast.success("Login successfully.");
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
        toast.error(payload);
      })
      // Logout user
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        toast.success(payload);
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Login status
      .addCase(loginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = payload;
        if (payload.message === "invalid token") {
          state.isLoggedIn = false;
        }
      })
      .addCase(loginStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = payload;
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = payload;
        toast.success("User updated successfully.");
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = payload;
        toast.success("Password updated successfully.");
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      });
  },
});

export default authSlice.reducer;
