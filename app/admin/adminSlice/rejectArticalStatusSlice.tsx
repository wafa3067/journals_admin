import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RejectPayload {
  id: number;
  status: string;
  comments?: string;
}

interface ArticleState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

// ✅ Initial State
const initialState: ArticleState = {
  loading: false,
  error: null,
  success: null,
};

// ✅ Async Thunk
export const rejectArticleStatus = createAsyncThunk<
  { message: string }, // Return type
  RejectPayload, // Arg type
  { rejectValue: { error: string } } // Rejected value
>(
  "articles/rejectArticle",
  async ({ id, status, comments }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/articles/reject/${id}`,
        null,
        {
          params: { status, comments },
        },
      );
      return response.data;
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue({ error: message || "Failed to reject article" });
    }
  },
);

const rejectArticleStatusSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    resetArticleState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(rejectArticleStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(rejectArticleStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(rejectArticleStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to reject article";
      });
  },
});

export const { resetArticleState } = rejectArticleStatusSlice.actions;
export default rejectArticleStatusSlice.reducer;
