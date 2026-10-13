import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Aims {
  id: number;
  title: string;
  descriptions: string;
  bulletsPoints: boolean;
}

export const GetAims = createAsyncThunk(
  "home/aims",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/aims/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to save aims data");
      }

      const data = await res.json();

      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving aims data");
    }
  },
);

interface AimsState {
  aims: Aims[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AimsState = {
  aims: [],
  loading: false,
  error: null,
  success: false,
};

const GetAimsSlice = createSlice({
  name: "aims",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAims.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(GetAims.fulfilled, (state, action) => {
        state.loading = false;
        state.aims = action.payload;
        state.success = true;
      })
      .addCase(GetAims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default GetAimsSlice.reducer;
