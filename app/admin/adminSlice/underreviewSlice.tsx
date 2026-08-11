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
  createdAt?: string;
  reviewEndDate?: string;
  reviewStartDate?: string;
  reviewerAssigned?: string;
  reviewerAnser?: string;
  keywords?: string;
  referenceText?: string;
  pdf?: string;
  reviewerComment?: string;
  status: string;
  copyeditor?: string;
  approvedBy?: string;
  showDetails?: boolean; // for UI toggle
}

interface UnderReviewState {
  articles: Article[];
  loading: boolean;
  error?: string;
}

const initialState: UnderReviewState = {
  articles: [],
  loading: false,
  error: undefined,
};

// Fetch pending articles
export const fetchUnderReview = createAsyncThunk<Article[]>(
  "pending/fetchUnderReview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/under-review`);
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

export const assignCopyEditor = createAsyncThunk(
  "pending/assignReviewer",
  async (
    {
      articleId,
      copyeditor,
      status,
      comments,
    }: {
      articleId: number;
      copyeditor: string;
      status: string;
      comments: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/admin/articles/copyeditor/${articleId}?copyEditor=${encodeURIComponent(
          copyeditor,
        )}&status=${encodeURIComponent(status)}&comments=${encodeURIComponent(
          comments,
        )}`,
      );
      if (res.status !== 200) throw new Error("Failed to assign reviewer");

      // Automatically update status
      return res.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.message) {
        message = String(err.message);
      }
      return rejectWithValue(message);
    }
  },
);
export const modifyCopyEditor = createAsyncThunk(
  "pending/copyeditor",
  async (
    {
      articleId,
      copy,
    }: {
      articleId: number;
      copy: boolean;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/admin/articles/modify-copy/${articleId}?copy=${encodeURIComponent(
          copy,
        )}`,
      );
      if (res.status !== 200) throw new Error("Failed to assign reviewer");

      // Automatically update status
      return res.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.message) {
        message = String(err.message);
      }
      return rejectWithValue(message);
    }
  },
);

const underReviewSlice = createSlice({
  name: "underReview",
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
      .addCase(fetchUnderReview.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUnderReview.fulfilled, (state, action) => {
        state.articles = action.payload.map((a) => ({
          ...a,
          showDetails: false,
        }));
        state.loading = false;
      })
      .addCase(fetchUnderReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // update status
  },
});

export const { toggleDetails } = underReviewSlice.actions;
export default underReviewSlice.reducer;
