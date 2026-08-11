import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface getPartnership {
  id: number;
  desc: string;
  title: string;
  date: string;
  descriptions: string;
  image: string;
  link: string;
}

export const getPartnershipData = createAsyncThunk(
  "home/Partnership/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/Partnership/get`, {
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
      return rejectWithValue("An error occurred while saving Partnership data");
    }
  },
);

interface GetPartnershipState {
  getPartnership: getPartnership[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: GetPartnershipState = {
  getPartnership: [],
  loading: false,
  error: null,
  success: false,
};

const getPartnershipSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPartnershipData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getPartnershipData.fulfilled, (state, action) => {
        state.loading = false;
        state.getPartnership = action.payload;
        state.success = true;
      })
      .addCase(getPartnershipData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getPartnershipSlice.reducer;
