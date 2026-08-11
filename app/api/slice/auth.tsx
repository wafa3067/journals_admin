// lib/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../actions/articleActions";

export interface User {
  id: number;
  givenName: string;
  familyName: string;
  affiliation: string;
  country: string;
  email: string;
  username: string;
  role: string;
  status: string;
  emailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  loadings: boolean;
  errors: string | null;
  isAuthenticated: boolean;
}

export interface RegisterData {
  givenName: string;
  familyName: string;
  affiliation: string;
  country: string;
  email: string;
  status: string;
  username: string;
  password: string;
  emailVerified: boolean;
}

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      //console.log("response:", response);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }
      if (data.message === "Email already registered!") {
        return rejectWithValue(data.message);
      }
      //console.log("Registration successful:", response, data);
      return "data.message";
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  },
);

const initialState: AuthState = {
  user: null,
  loadings: false,
  errors: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loadings = true;
        state.errors = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loadings = false;
        state.errors = null;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadings = false;
        state.isAuthenticated = false;

        // Handle the error message - it could be from rejectWithValue
        if (action.payload) {
          state.errors = action.payload as string;
        } else if (action.error.message) {
          state.errors = action.error.message;
        } else {
          state.errors = "Registration failed";
        }
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
