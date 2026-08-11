import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ContactInfo {
  id: number;
  firstName?: string;
  lastName?: string;
  emailName?: string;
  phone?: string;
  message?: string;
}

export const getContactIngo = createAsyncThunk(
  "home/contact",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/contact/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save contact data",
        );
      }

      const data = await res.json();

      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving contact data");
    }
  },
);

interface ContactInfoIntial {
  contact: ContactInfo[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactInfoIntial = {
  contact: [],
  loading: false,
  error: null,
  success: false,
};

const getContactInfoSlice = createSlice({
  name: "contact info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactIngo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getContactIngo.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
        state.success = true;
      })
      .addCase(getContactIngo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getContactInfoSlice.reducer;
