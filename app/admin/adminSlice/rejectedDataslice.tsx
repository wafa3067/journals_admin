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
export const fetchRejectedArticle = createAsyncThunk<Article[]>(
  "pending/fetchRejectedArticle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/rejected`);

      return response.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.message) {
        message = String(err.message);
      }
      return rejectWithValue(message);
    }
  },
);

// Update article status
export const updateRejectArticleStatus = createAsyncThunk(
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
      let message = "Failed to update article status";
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        message = String(err.response?.data?.error);
      }
      return rejectWithValue({ error: message });
    }
  },
);

const RejectedDataSlice = createSlice({
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
      .addCase(fetchRejectedArticle.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchRejectedArticle.fulfilled, (state, action) => {
        state.articles = action.payload.map((a) => ({
          ...a,
          showDetails: false,
        }));
        state.loading = false;
      })
      .addCase(fetchRejectedArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update status
      .addCase(updateRejectArticleStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        state.articles = state.articles.map((a) =>
          a.id === id ? { ...a, status } : a,
        );
      });
  },
});

export const { toggleDetails } = RejectedDataSlice.actions;
export default RejectedDataSlice.reducer;
