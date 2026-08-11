import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Language {
  id: number;
  name: string;
}

export interface User {
  id: number;
  givenName: string;
  familyName: string;
  username: string;
  email: string;
  status: string;
  phone?: string;
  affiliation?: string;
  country?: string;
  profile?: string;
  bio?: string;
  homeurl?: string;
  orcid_id?: string;
  joinedDate?: string;
  publicName?: string;
  signature?: string;
  maillingAddress?: string;
  review?: string;
  privacyAgree?: boolean;
  enableNotification?: boolean;
  emailVerified?: boolean;
  role?: Language[];
  languagesList?: Language[];
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${BACKEND_URL}/admin/users`);
  // ✅ since your backend returns an array directly
  // If backend returns a string, parse it
  if (typeof response.data === "string") {
    return JSON.parse(response.data);
  }

  return response.data;
  return response.data;
});

const userDataSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load users";
      });
  },
});

export default userDataSlice.reducer;
