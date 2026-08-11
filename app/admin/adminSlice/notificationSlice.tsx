import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Notification {
  id?: number;
  title: string;
  message: string;
  email: string;
  status: string;
  createdAt?: string;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

// ✅ Async thunk to add notification
export const addNotification = createAsyncThunk(
  "notifications/addNotification",
  async (
    {
      title,
      message,
      email,
      status,
    }: { title: string; message: string; email: string; status: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/notification/add/?title=${encodeURIComponent(
          title,
        )}&message=${encodeURIComponent(message)}&email=${encodeURIComponent(
          email,
        )}&status=${encodeURIComponent(status)}&created=${encodeURIComponent(
          new Date().toISOString(),
        )}`,
      );
      return response.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message || "Failed to add notification");
    }
  },
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addNotification.fulfilled,
        (state, action: PayloadAction<Notification>) => {
          state.loading = false;
          state.notifications.push(action.payload);
        },
      )
      .addCase(addNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default notificationSlice.reducer;
