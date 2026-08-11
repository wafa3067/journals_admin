import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../actions/articleActions";

interface Notification {
  id: number;
  title: string;
  message: string;
  status: string;
  email: string;
  created: string;
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
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

// ✅ Get all notifications by user
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("email");
      const res = await axios.get(
        `${BACKEND_URL}/notification/get_notifications/${email}`,
      );
      return res.data;
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message || "Failed to fetch notifications");
    }
  },
);

// ✅ Get unread notification count
export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("email");

      const res = await axios.get(
        `${BACKEND_URL}/notification/count_unread/${email}`,
      );
      return res.data;
    } catch (err: unknown) {
      let message = " failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message || "Failed to fetch unread count");
    }
  },
);

// ✅ Mark all notifications as read
export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.put(
        `${BACKEND_URL}/notification/mark_all_read/${email}`,
      );
      return res.data; // "X notifications marked as read"
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message || "Failed to mark as read");
    }
  },
);

const getNotificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🟡 Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔵 Fetch unread count
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

      // 🟢 Mark all as read
      .addCase(markAllNotificationsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.loading = false;
        state.notifications = state.notifications.map((n) => ({
          ...n,
          isRead: true,
        }));
        state.unreadCount = 0;
      })
      .addCase(markAllNotificationsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default getNotificationSlice.reducer;
