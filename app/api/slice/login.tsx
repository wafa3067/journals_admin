// lib/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../actions/articleActions";

export interface AuthState {
  token: string;
  loadings: boolean;
  errors: string | null;
  isAuthenticated: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
}

// Async thunk for registration
export const loginUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const errorData = await response.json();

      if (!response.ok) {
        return rejectWithValue(errorData["error"] || "Registration failed");
      }
      if (errorData["error"] === "Invalid email or password") {
        return rejectWithValue(errorData["error"] || "Registration failed");
      }
      if (errorData["error"] === "Please verify your email address first") {
        return rejectWithValue(errorData["error"] || "Registration failed");
      }
      if (
        errorData["error"] !== "Please verify your email address first" &&
        errorData["error"] !== "Invalid email or password"
      ) {
        localStorage.setItem("id", errorData["id"]);
        localStorage.setItem("token", errorData["token"]);
        localStorage.setItem("email", errorData["email"]);
        localStorage.setItem("name", errorData["name"]);
        localStorage.setItem("role", errorData["role"]);
      }

      return errorData;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  },
);

const initialState: AuthState = {
  token: "",
  loadings: false,
  errors: null,
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = null;
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(loginUser.pending, (state) => {
        state.loadings = true;
        state.errors = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadings = false;
        state.errors = null;

        if (action.payload["error"] === "Invalid email or password") {
          state.errors = "Invalid Email or Password";
          state.isAuthenticated = false;
        } else if (
          action.payload["error"] === "Please verify your email address first"
        ) {
          state.errors = "Please verify your email address first";
          state.isAuthenticated = false;
        } else {
          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadings = false;
        state.isAuthenticated = false;

        // Handle the error message - it could be from rejectWithValue
        if (action.payload) {
          state.errors = action.payload as string;
        } else if (action.error.message) {
          state.errors = action.error.message;
        } else {
          state.errors = "Login failed";
        }
      });
  },
});

export const { clearError, logout } = loginSlice.actions;
export default loginSlice.reducer;
