
import { BACKEND_URL } from "@/app/api/actions/articleActions";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

const API_URL = `${BACKEND_URL}`;

// Reviewer returned by the backend
export interface Reviewer {
  id: number;
  email: string;
  name?: string; // Optional name field
}

// Authentication response
interface AuthResponse {
  message?: string;
  error?: string;
  token?: string;
  data: ParamMap; // Store the entire response data if needed
}
interface ParamMap {name: string, email: string,id: number}

// Registration/login request
interface ReviewerCredentials {
  username: string;
  password: string;
  name?: string; // Optional name field for registration
}

// Redux state
interface ReviewerState {
  reviewers: Reviewer[];
  loading: boolean;
  error: string | null;
  message: string | null;
  token: string | null;
  username: string | null;
  data: any | null; // Store the entire response data if needed
}

const initialState: ReviewerState = {
  reviewers: [],
  loading: false,
  error: null,
  message: null,
  token: null,
  data: null,
  username: null,
};

// ============================================
// GET ALL REVIEWERS
// GET /reviewer/get
// ============================================
export const fetchReviewers = createAsyncThunk<
  Reviewer[],
  void,
  { rejectValue: string }
>("reviewer/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/get`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return rejectWithValue(
        errorText || "Failed to fetch reviewers"
      );
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return rejectWithValue("Invalid reviewer data received from server");
    }

    return data.map((item: Record<string, unknown>) => ({
      id: Number(item.id),
      email: String(item.email ?? item.username ?? ""),
        name: String(item.name ?? ""),
    }));
  } catch {
    return rejectWithValue("Unable to connect to the server");
  }
});

// ============================================
// REGISTER REVIEWER
// POST /reviewer/register
// ============================================
export const registerReviewer = createAsyncThunk<
  AuthResponse,
  ReviewerCredentials,
  { rejectValue: string }
>(
  "reviewer/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("username", credentials.username);
      params.append("password", credentials.password);
      params.append("name", (credentials as any).name || ""); // Optional name field

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params.toString(),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok || data.error) {
        return rejectWithValue(
          data.error || data.message || "Reviewer registration failed"
        );
      }

      return data;
    } catch {
      return rejectWithValue("Unable to connect to the server");
    }
  }
);

// ============================================
// LOGIN REVIEWER
// POST /reviewer/login
// ============================================
export const loginReviewer = createAsyncThunk<
  AuthResponse,
  ReviewerCredentials,
  { rejectValue: string }
>(
  "reviewer/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("username", credentials.username);
      params.append("password", credentials.password);
      


      const response = await fetch(`${API_URL}/reviewer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params.toString(),
        
      });

      const data: AuthResponse = await response.json();
      if (!response.ok || data.error || !data.token) {
        return rejectWithValue(
          data.error || data.message || "Invalid username or password"
        );
      }

      return data
    } catch {
      return rejectWithValue("Unable to connect to the server");
    }
  }
);

// ============================================
// REDUX SLICE
// ============================================
const reviewerSlice = createSlice({
  name: "reviewer",
  initialState,

  reducers: {
    logoutReviewer: (state) => {
      state.token = null;
      state.username = null;
      state.message = null;
      state.error = null;
    },

    clearReviewerError: (state) => {
      state.error = null;
    },

    clearReviewerMessage: (state) => {
      state.message = null;
    },

    setReviewerCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        username: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },

    clearReviewers: (state) => {
      state.reviewers = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // ----------------------------
      // FETCH ALL REVIEWERS
      // ----------------------------
      .addCase(fetchReviewers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewers.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewers = action.payload;
      })
      .addCase(fetchReviewers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to fetch reviewers";
      })

      // ----------------------------
      // REGISTER REVIEWER
      // ----------------------------
      .addCase(registerReviewer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerReviewer.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Reviewer registered successfully";
      })
      .addCase(registerReviewer.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Registration failed";
      })

      // ----------------------------
      // LOGIN REVIEWER
      // ----------------------------
      .addCase(loginReviewer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginReviewer.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token || null;
        state.message = action.payload.message || "Login successful";
      })
      .addCase(loginReviewer.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Login failed";
      });
  },
});

// ============================================
// EXPORT ACTIONS AND REDUCER
// ============================================
export const {
  logoutReviewer,
  clearReviewerError,
  clearReviewerMessage,
  setReviewerCredentials,
  clearReviewers,
} = reviewerSlice.actions;

export default reviewerSlice.reducer;
