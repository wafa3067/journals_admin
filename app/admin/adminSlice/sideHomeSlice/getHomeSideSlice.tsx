import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface GetSideHomeState {
  id: number;
  image: string;
}

export const CreateGetSideHome = createAsyncThunk(
  "home/side",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/side/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const sideerrorData = await res.json();
        return rejectWithValue(
          sideerrorData.message || "Failed to save side data",
        );
      }

      const data = await res.json();
      //console.log("response is", data);
      return data;
    } catch (err) {
      return rejectWithValue("An sideerror occurred while saving side data");
    }
  },
);

interface GetHomeState {
  side: GetSideHomeState[];
  sideloading: boolean;
  sideerror: string | null;
  sidesuccess: boolean;
}

const initialState: GetHomeState = {
  side: [],
  sideloading: false,
  sideerror: null,
  sidesuccess: false,
};

const getSideHomeStateSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateGetSideHome.pending, (state) => {
        state.sideloading = true;
        state.sideerror = null;
        state.sidesuccess = false;
      })
      .addCase(CreateGetSideHome.fulfilled, (state, action) => {
        state.sideloading = false;
        state.side = action.payload;
        state.sidesuccess = true;
      })
      .addCase(CreateGetSideHome.rejected, (state, action) => {
        state.sideloading = false;
        state.sideerror = action.payload as string;
        state.sidesuccess = false;
      });
  },
});

export default getSideHomeStateSlice.reducer;
