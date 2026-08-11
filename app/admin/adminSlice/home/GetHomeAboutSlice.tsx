import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface HomeAbout {
  id: number;
  title: string;
  descriptions: string;
}

export const AboutHomeGetPage = createAsyncThunk(
  "home/about",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/about/get`, {
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

interface HomeState {
  about: HomeAbout[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: HomeState = {
  about: [],
  loading: false,
  error: null,
  success: false,
};

const getHomeAboutSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AboutHomeGetPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(AboutHomeGetPage.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
        state.success = true;
      })
      .addCase(AboutHomeGetPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default getHomeAboutSlice.reducer;
