import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface getSerivces {
  id: number;
  desc: string;
  title: string;
  date: string;
  descriptions: string;
  image: string;
  link: string;
}

export const getSerivcesData = createAsyncThunk(
  "home/Services/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/Services/get`, {
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
      return rejectWithValue("An error occurred while saving Serivces data");
    }
  },
);

interface GetSerivcesState {
  getSerivces: getSerivces[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetSerivcesState = {
  getSerivces: [],
  loading: false,
  error: null,
  success: false,
};

const getSerivcesSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSerivcesData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSerivcesData.fulfilled, (state, action) => {
        state.loading = false;
        state.getSerivces = action.payload;
        state.success = true;
      })
      .addCase(getSerivcesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getSerivcesSlice.reducer;
