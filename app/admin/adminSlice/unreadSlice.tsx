import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface modificationPayload {
  id: number;
  title: string;
  email: string;
  status: string;
  message: string;
  isRead: boolean;
  dateCreated: string;
}

interface NotificationState {
  notifications: modificationPayload[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// ✅ Fetch unread count
export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/notification/count_unread/${email}`,
      );
      return response.data; // Long value (number)
    } catch (err: unknown) {
      let message = "0";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message || "Failed to fetch count");
    }
  },
);

// ✅ Fetch all notifications for user
export const fetchUnNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/notification/get_notifications/${email}`,
      );
      return response.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message || "Failed to fetch notifications");
    }
  },
);

const unreadNotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAllAsRead(state) {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        isRead: true,
      }));
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 Fetch unread count
      .addCase(fetchUnreadCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.loading = false;
        state.unreadCount = action.payload;
      })
      .addCase(fetchUnreadCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔵 Fetch notifications
      .addCase(fetchUnNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchUnNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { markAllAsRead } = unreadNotificationSlice.actions;
export default unreadNotificationSlice.reducer;
