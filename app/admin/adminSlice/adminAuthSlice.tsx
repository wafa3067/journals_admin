//changes when build
export interface Admin {
  id: number;

  name: string;
  email: string;
}

export interface AdminAuthState {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  error: string;
  success: boolean;
}

import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
}

// 🟢 Admin Login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/admin/login/login`, null, {
        params: {
          username: credentials.username, // 👈 send as username
          password: credentials.password,
        },
      });
      if (res.status != 200) {
        return rejectWithValue("Invalid username or password ❌");
      }

      return res.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message);
    }
  },
);

// 🟢 Admin Registration
export const adminRegister = createAsyncThunk(
  "admin/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/admin/login/register`,
        null,
        {
          params: {
            username: data.username, // 👈 send as username
            password: data.password,
          },
        },
      );
      return res.data;
    } catch (err: unknown) {
      let message = "Registration failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }

      return rejectWithValue(message);
    }
  },
);

const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

const initialState: AdminAuthState = {
  admin: null,
  token: tokenFromStorage,
  loading: false,
  error: "",
  success: false,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload["error"] === "Invalid username or password ❌") {
          state.error = action.payload["error"];
        }
        state.admin = action.payload["admin"];
        state.token = action.payload["token"];
        localStorage.setItem("adminToken", action.payload["token"]);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // 🔹 Register
      .addCase(adminRegister.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(adminRegister.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
