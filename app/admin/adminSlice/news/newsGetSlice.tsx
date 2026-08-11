import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface getNews {
  id: number;
  desc: string;
  title: string;
  date: string;
  descriptions: string;
  image: string;
  link: string;
}

export const getNewsData = createAsyncThunk(
  "home/news/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/news/get`, {
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
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving news data");
    }
  },
);

interface GetNewsState {
  getNews: getNews[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetNewsState = {
  getNews: [],
  loading: false,
  error: null,
  success: false,
};

const getNewsSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getNewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.getNews = action.payload;
        state.success = true;
      })
      .addCase(getNewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getNewsSlice.reducer;
