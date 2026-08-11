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
  userProductionComments: string;
  productionComments: string;
  modifyProduction: string;
  keywords?: string;
  referenceText?: string;
  pdf?: string;
  reviewerComment?: string;
  status: string;
  copyeditor?: string;
  approvedBy?: string;
  showDetails?: boolean; // for UI toggle
  finalFile?: string | null; // new field for final file
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
export const fetchProduction = createAsyncThunk<Article[]>(
  "pending/fetchUnderReview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/get-production`);
      return response.data;
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.message) {
        message = String(err.message);
      }
      return rejectWithValue(message);
    }
  },
);

// Update article status

// Assign reviewer
export const assignApproved = createAsyncThunk(
  "pending/assignToProduction",
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
        `${BACKEND_URL}/admin/articles/production/${articleId}`,
        `${BACKEND_URL}/admin/articles/copyeditor/${articleId}?productionNotes=${encodeURIComponent(
          productionNotes,
        )}&status=${encodeURIComponent(status)}`,
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

const productionSlice = createSlice({
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
      .addCase(fetchProduction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchProduction.fulfilled, (state, action) => {
        state.articles = action.payload.map((a) => ({
          ...a,
          showDetails: false,
        }));
        state.loading = false;
      })
      .addCase(fetchProduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // update status
  },
});

export const { toggleDetails } = productionSlice.actions;
export default productionSlice.reducer;
