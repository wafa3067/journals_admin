import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthorsGuidline {
  id: number;
  title: string;
  descriptions: string;
}

export const getAuthorsGuidlines = createAsyncThunk(
  "home/authorsguidlines",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/author/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save author data",
        );
      }

      const data = await res.json();

      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving author data");
    }
  },
);

interface AuthorsState {
  author: AuthorsGuidline[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthorsState = {
  author: [],
  loading: false,
  error: null,
  success: false,
};

const getAuthorsGuidlinesSlice = createSlice({
  name: "authors guidlines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthorsGuidlines.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAuthorsGuidlines.fulfilled, (state, action) => {
        state.loading = false;
        state.author = action.payload;
        state.success = true;
      })
      .addCase(getAuthorsGuidlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getAuthorsGuidlinesSlice.reducer;
