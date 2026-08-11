import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface getConferences {
  id: number;
  desc: string;
  title: string;
  date: string;
  descriptions: string;
  image: string;
  link: string;
}

export const getConferencesData = createAsyncThunk(
  "home/Conferences/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/Conferences/get`, {
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
      return rejectWithValue("An error occurred while saving Conferences data");
    }
  },
);

interface GetConferencesState {
  getConferences: getConferences[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetConferencesState = {
  getConferences: [],
  loading: false,
  error: null,
  success: false,
};

const getConferencesSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConferencesData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getConferencesData.fulfilled, (state, action) => {
        state.loading = false;
        state.getConferences = action.payload;
        state.success = true;
      })
      .addCase(getConferencesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getConferencesSlice.reducer;
