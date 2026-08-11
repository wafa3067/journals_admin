import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface getAdvertising {
  id: number;
  desc: string;
  title: string;
  date: string;
  descriptions: string;
  image: string;
  link: string;
}

export const getAdvertisingData = createAsyncThunk(
  "home/Advertising/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/Advertising/get`, {
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
      return rejectWithValue("An error occurred while saving Advertising data");
    }
  },
);

interface GetAdvertisingState {
  getAdvertising: getAdvertising[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetAdvertisingState = {
  getAdvertising: [],
  loading: false,
  error: null,
  success: false,
};

const getAdvertisingSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdvertisingData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAdvertisingData.fulfilled, (state, action) => {
        state.loading = false;
        state.getAdvertising = action.payload;
        state.success = true;
      })
      .addCase(getAdvertisingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getAdvertisingSlice.reducer;
