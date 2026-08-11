import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../actions/articleActions";

interface PasswordState {
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: PasswordState = {
  loading: false,
  message: null,
  error: null,
};

// 🔹 Async thunk to call Spring Boot API
export const updatePassword = createAsyncThunk<
  string, // return type
  { oldPassword: string; newPassword: string }, // args
  { rejectValue: string } // error type
>(
  "password/updatePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      // get token (optional)
      const token = await localStorage.getItem("token");
      const email = await localStorage.getItem("email");
      const response = await axios.patch(
        `${BACKEND_URL}/api/update/password?email=${email}`,
        null, // no body
        {
          params: { oldPassword, newPassword },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message || "Failed to update password");
    }
  },
);

// 🔹 Slice
const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(
        updatePassword.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.message = action.payload;
        },
      )
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error updating password";
      });
  },
});

export const { clearMessage } = passwordSlice.actions;
export default passwordSlice.reducer;
