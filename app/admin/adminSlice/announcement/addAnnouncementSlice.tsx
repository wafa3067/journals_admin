import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Addannouncement {
  title: string;
  date: string;
  desc: string;
  link: string;
  image: File | null;
}

export const addAnnouncement = createAsyncThunk(
  "home/announcement",
  async (announcementData: Addannouncement, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", announcementData.title);
      formData.append("date", announcementData.date);
      formData.append("desc", announcementData.desc);
      formData.append("link", announcementData.link);
      if (announcementData.image) {
        formData.append("image", announcementData.image);
      }

      const res = await axios.post(
        `${BACKEND_URL}/home/announcement/add`,
        formData,
      );

      return res;
    } catch (err) {
      return rejectWithValue(
        "An error occurred while saving announcement data",
      );
    }
  },
);

export const editAnnouncementData = createAsyncThunk(
  "home/announcement",
  async (
    announcementData: Addannouncement & { id: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/announcement/update?id=${announcementData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: announcementData.title,
            descriptions: announcementData.desc,
            date: announcementData.date,
            link: announcementData.link,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save announcement data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(
        "An error occurred while saving announcement data",
      );
    }
  },
);

export const deleteAnnouncementData = createAsyncThunk(
  "home/announcement",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/announcement/del?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save announcement data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(
        "An error occurred while saving announcement data",
      );
    }
  },
);

interface AnnouncementState {
  announcement: Addannouncement[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AnnouncementState = {
  announcement: [],
  loading: false,
  error: null,
  success: false,
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        // state.announcement = action.payload;
        state.success = true;
      })
      .addCase(addAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default announcementSlice.reducer;
