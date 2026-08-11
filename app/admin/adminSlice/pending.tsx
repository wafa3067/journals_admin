import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface Article {
  id: number;
  title: string;
  givenName: string;
  familyName: string;
  email: string;
  affiliation?: string;
  subtitle?: string;
  abstracts?: string;
  keywords?: string;
  referenceText?: string;
  pdf?: string;
  reviewerComment?: string;
  createdAt?: string;
  status: string;
  copyeditor?: string;
  approvedBy?: string;

  showDetails?: boolean; // for UI toggle
}

interface PendingState {
  articles: Article[];
  loading: boolean;
  error?: string;
}

const initialState: PendingState = {
  articles: [],
  loading: false,
  error: undefined,
};

// Fetch pending articles
export const fetchPendingArticles = createAsyncThunk<Article[]>(
  "pending/fetchPendingArticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/pending`);
      return response.data;
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response);
      }
      return rejectWithValue(message);
    }
  },
);

// Update article status
export const updateArticleStatus = createAsyncThunk(
  "pending/updateArticleStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/admin/articles/status/${id}?status=${status}`,
      );
      if (res.status !== 200) throw new Error("Failed to update status");
      return { id, status };
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.message) {
        message = String(err.message);
      }
      return rejectWithValue(message);
    }
  },
);

export const assignReviewer = createAsyncThunk(
  "pending/assignReviewer",
  async (
    {
      articleId,
      reviewer,
      start,
      end,
    }: {
      articleId: number;
      reviewer: string;
      start: string;
      end: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/admin/articles/status/${articleId}`,
        null, // no body needed
        {
          params: {
            status: "Under Review",
            reviewerAssigned: reviewer,
            reviewStartDate: start,
            reviewEndDate: end,
          },
        },
      );

      if (res.status !== 200) throw new Error("Failed to assign reviewer");
      return res.data;
    } catch (err: unknown) {
      let message = " failed";

      if (axios.isAxiosError(err) && err.message) {
        message = String(err.message);
      }
      return rejectWithValue(message);
    }
  },
);

const pendingSlice = createSlice({
  name: "pending",
  initialState,
  reducers: {
    toggleDetails: (state, action: PayloadAction<number>) => {
      state.articles = state.articles.map((a) =>
        a.id === action.payload ? { ...a, showDetails: !a.showDetails } : a,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchPendingArticles.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchPendingArticles.fulfilled, (state, action) => {
        state.articles = action.payload.map((a) => ({
          ...a,
          showDetails: false,
        }));
        state.loading = false;
      })
      .addCase(fetchPendingArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update status
      .addCase(updateArticleStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        state.articles = state.articles.map((a) =>
          a.id === id ? { ...a, status } : a,
        );
      });
  },
});

export const { toggleDetails } = pendingSlice.actions;
export default pendingSlice.reducer;
