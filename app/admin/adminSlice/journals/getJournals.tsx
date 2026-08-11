import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Journals {
  id: number;
  title: string;
  descriptions: string;
  bulletsPoints: boolean;
}

export const getJournals = createAsyncThunk(
  "home/insight",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/insight/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save insight data",
        );
      }

      const data = await res.json();
      // Log the fetched data
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving insight data");
    }
  },
);

interface GetJournals {
  insight: Journals[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetJournals = {
  insight: [],
  loading: false,
  error: null,
  success: false,
};

const getJournalsSlice = createSlice({
  name: "insight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJournals.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getJournals.fulfilled, (state, action) => {
        state.loading = false;
        state.insight = action.payload;
        state.success = true;
      })
      .addCase(getJournals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getJournalsSlice.reducer;
