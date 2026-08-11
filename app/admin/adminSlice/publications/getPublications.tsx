import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Publication {
  id: number;
  title: string;
  descriptions: string;
  bullets: boolean;
}

export const getPublicationInsights = createAsyncThunk(
  "home/publication",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/publication/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save publication data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving publication data");
    }
  },
);

interface PublicationState {
  publication: Publication[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PublicationState = {
  publication: [],
  loading: false,
  error: null,
  success: false,
};

const getPublicationsInsightsSlice = createSlice({
  name: "publications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublicationInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getPublicationInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.publication = action.payload;
        state.success = true;
      })
      .addCase(getPublicationInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getPublicationsInsightsSlice.reducer;
