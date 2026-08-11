import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface getCareers {
  id: number;
  desc: string;
  title: string;
  date: string;
  descriptions: string;
  image: string;
  link: string;
}

export const getCareersData = createAsyncThunk(
  "home/Careers/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/Careers/get`, {
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
      return rejectWithValue("An error occurred while saving Careers data");
    }
  },
);

interface GetCareersState {
  getCareers: getCareers[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetCareersState = {
  getCareers: [],
  loading: false,
  error: null,
  success: false,
};

const getCareersSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCareersData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCareersData.fulfilled, (state, action) => {
        state.loading = false;
        state.getCareers = action.payload;
        state.success = true;
      })
      .addCase(getCareersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getCareersSlice.reducer;
