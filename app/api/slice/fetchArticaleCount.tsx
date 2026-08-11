import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../actions/articleActions";

interface ArticleStatsState {
  total: number | null;
  pending: number | null;
  approved: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticleStatsState = {
  total: null,
  pending: null,
  approved: null,
  loading: false,
  error: null,
};

// ✅ Fetch total articles
export const fetchTotalArticles = createAsyncThunk(
  "articleStats/fetchTotal",
  async () => {
    const token = await localStorage.getItem("token");
    const email = await localStorage.getItem("email");
    if (token != null && token !== "") {
      const res = await axios.get(
        `${BACKEND_URL}/api/total-article?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return res.data; // returns number
    }
  },
);

// ✅ Fetch pending articles
export const fetchPendingArticles = createAsyncThunk(
  "articleStats/fetchPending",
  async () => {
    const token = await localStorage.getItem("token");
    const email = await localStorage.getItem("email");
    if (token != null && token !== "") {
      const res = await axios.get(
        `${BACKEND_URL}/api/pending-article?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return res.data;
    }
    // returns number
  },
);

// ✅ Fetch approved articles
export const fetchApprovedArticles = createAsyncThunk(
  "articleStats/fetchApproved",
  async () => {
    const email = await localStorage.getItem("email");
    const token = await localStorage.getItem("token");
    if (token != null && token !== "") {
      const res = await axios.get(
        `${BACKEND_URL}/api/total-approved?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return res.data;
    }
    // returns number
  },
);

const getCountArticles = createSlice({
  name: "articleStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // total
      .addCase(fetchTotalArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTotalArticles.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.total = action.payload;
          state.error = null;
        },
      )
      .addCase(fetchTotalArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch total articles";
      })
      // pending
      .addCase(fetchPendingArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPendingArticles.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.pending = action.payload;
          state.error = null;
        },
      )
      .addCase(fetchPendingArticles.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch pending articles";
      })
      // approved
      .addCase(fetchApprovedArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchApprovedArticles.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.approved = action.payload;
          state.error = null;
        },
      )
      .addCase(fetchApprovedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch approved articles";
      });
  },
});

export default getCountArticles.reducer;
