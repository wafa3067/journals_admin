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
  keywords?: string;
  referenceText?: string;
  underReviewComments: string;
  modifyCopyEditor: boolean;
  userComments: string;
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
export const fetchCopyEdit = createAsyncThunk<Article[]>(
  "pending/fetchUnderReview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/copy-editor`);
      return response.data;
    } catch (err) {
      let message = "Failed to fetch copy editor articles";
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        message = String(err.response?.data?.error);
      }
      return rejectWithValue(message);
    }
  },
);

// Update article status

// Assign reviewer
export const assignToProduction = createAsyncThunk(
  "pending/assignReviewer",
  async (
    {
      articleId,
      productionNotes,
      status,
    }: { articleId: number; productionNotes: string; status: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/admin/articles/production/${articleId}?productionNotes=${encodeURIComponent(
          productionNotes,
        )}&status=${encodeURIComponent(status)}`,
      );
      if (res.status !== 200) throw new Error("Failed to assign reviewer");

      // Automatically update status
      return res.data;
    } catch (err: unknown) {
      let message = "Failed to assign to production";

      if (axios.isAxiosError(err) && err.response?.data?.error) {
        message = String(err.response?.data?.error);
      }
      return rejectWithValue(message);
    }
  },
);

const ProductionSlice = createSlice({
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
      .addCase(fetchCopyEdit.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCopyEdit.fulfilled, (state, action) => {
        state.articles = action.payload.map((a) => ({
          ...a,
          showDetails: false,
        }));
        state.loading = false;
      })
      .addCase(fetchCopyEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // update status
  },
});

export const { toggleDetails } = ProductionSlice.actions;
export default ProductionSlice.reducer;
