// store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../actions/articleActions";

interface UserState {
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  message: null,
  error: null,
};

// ✅ Async thunk to upload image + update profile fields
export const updatePublicProfile = createAsyncThunk<
  string, // success return type
  FormData, // argument type
  { rejectValue: string } // reject type
>("user/updatePublicProfile", async (formData, { rejectWithValue }) => {
  try {
    const token = await localStorage.getItem("token");
    const email = await localStorage.getItem("email");
    const res = await axios.post(
      `${BACKEND_URL}/api/update/public?email=${email}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data as string;
  } catch (err: unknown) {
    let message = "Login failed";

    if (axios.isAxiosError(err) && err.response) {
      message = String(err.response.data);
    }
    return rejectWithValue(message || "Error updating user");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePublicProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(
        updatePublicProfile.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.message = action.payload;
        },
      )
      .addCase(updatePublicProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
      });
  },
});

export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;
