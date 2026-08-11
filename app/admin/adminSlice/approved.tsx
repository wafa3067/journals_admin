import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface Article {
  id: number;
  pdfUrl?: string;
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
export const fetchApproved = createAsyncThunk<Article[]>(
  "pending/fetchApproved",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/approved`);
      return response.data;
    } catch (err) {
      let message = "Failed to fetch approved articles";
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        message = String(err.response?.data?.error);
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
    } catch (er) {
      let message = "Failed to update article status";
      if (axios.isAxiosError(er) && er.response?.data?.error) {
        message = String(er.response?.data?.error);
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
    } catch (err) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.response?.data?.error) {
        message = String(err.response?.data?.error);
      }
      return rejectWithValue(message);
    }
  },
);

const ApprovedSlice = createSlice({
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
      .addCase(fetchApproved.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchApproved.fulfilled, (state, action) => {
        state.articles = action.payload.map((a) => ({
          ...a,
          showDetails: false,
        }));
        state.loading = false;
      })
      .addCase(fetchApproved.rejected, (state, action) => {
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

export const { toggleDetails } = ApprovedSlice.actions;
export default ApprovedSlice.reducer;
