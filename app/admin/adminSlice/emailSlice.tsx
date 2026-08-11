import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for sending email
export const sendArticleEmail = createAsyncThunk(
  "email/sendArticleEmail",
  async (
    {
      toEmail,
      authorName,
      status,
      articleTitle,
      body,
    }: {
      toEmail: string;
      authorName: string;
      articleTitle: string;
      status: string;
      body: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/email`,
        null, // no body, using query params
        {
          params: { toEmail, authorName, status, articleTitle, body },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to send email");
      }

      return response.data; // { message: "Email sent successfully" }
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data.error);
      }
      return rejectWithValue(message);
    }
  },
);

// Async thunk for sending email
export const sendReviewerEmail = createAsyncThunk(
  "email/sendArticleEmail",
  async (
    {
      toEmail,
      authorName,
      status,
      articleTitle,
      body,
    }: {
      toEmail: string;
      authorName: string;
      articleTitle: string;
      status: string;
      body: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/review`,
        null, // no body, using query params
        {
          params: { toEmail, authorName, status, articleTitle, body },
        },
      );

      if (response.status !== 200) {
        throw new Error("Failed to send email");
      }

      return response.data; // { message: "Email sent successfully" }
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data.error);
      }
      return rejectWithValue(message);
    }
  },
);
interface EmailState {
  loading: boolean;
  successMessage: string | null;
  error: string | null;
}

const initialState: EmailState = {
  loading: false,
  successMessage: null,
  error: null,
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    resetEmailState(state) {
      state.loading = false;
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendArticleEmail.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(sendArticleEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(sendArticleEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetEmailState } = emailSlice.actions;
export default emailSlice.reducer;
