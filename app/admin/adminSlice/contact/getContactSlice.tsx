import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contact } from "./addContactSlice";
import { BACKEND_URL } from "@/app/api/actions/articleActions";

export interface GetContact {
  id: number;
  title: string;
  descriptions?: string;
  type?: string;
}

export const GetContactThunk = createAsyncThunk(
  "home/about",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/contact/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save about data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving about data");
    }
  },
);

interface GetContactState {
  getContact: GetContact[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetContactState = {
  getContact: [],
  loading: false,
  error: null,
  success: false,
};

const getContactSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetContactThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GetContactThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.getContact = action.payload;
        state.success = true;
      })
      .addCase(GetContactThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getContactSlice.reducer;
