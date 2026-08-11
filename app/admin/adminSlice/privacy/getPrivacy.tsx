import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Privacy {
  id: number;
  title: string;
  descriptions: string;
  bullets: boolean;
}

export const getPrivacyInsights = createAsyncThunk(
  "home/Privacy",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/privacy/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save Privacy data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Privacy data");
    }
  },
);

interface PrivacyState {
  Privacy: Privacy[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PrivacyState = {
  Privacy: [],
  loading: false,
  error: null,
  success: false,
};

const getPrivacysInsightsSlice = createSlice({
  name: "Privacys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPrivacyInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getPrivacyInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.Privacy = action.payload;
        state.success = true;
      })
      .addCase(getPrivacyInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getPrivacysInsightsSlice.reducer;
