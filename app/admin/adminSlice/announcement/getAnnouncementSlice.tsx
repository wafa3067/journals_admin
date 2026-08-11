import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Announcement {
  id: number;
  desc: string;
  title: string;
  date: string;
  descriptions: string;
  image: File;
  link: string;
}

export const getAnnouncementData = createAsyncThunk(
  "announcement/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/announcement/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save about data",
        );
      }

      const data = await res.json();
      // Debug log

      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving about data");
    }
  },
);

interface HomeState {
  getAnnounce: Announcement[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: HomeState = {
  getAnnounce: [],
  loading: false,
  error: null,
  success: false,
};

const getAnnouncementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncementData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAnnouncementData.fulfilled, (state, action) => {
        state.loading = false;
        state.getAnnounce = action.payload;
        state.success = true;
      })
      .addCase(getAnnouncementData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getAnnouncementSlice.reducer;
