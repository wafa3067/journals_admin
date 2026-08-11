import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";

export interface HomeAbout {
  title?: string;
  descriptions?: string;
}

export const AboutHomePage = createAsyncThunk(
  "home/about",
  async (aboutData: HomeAbout, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/about/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: aboutData.title,
          descriptions: aboutData.descriptions,
        }),
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

export const editAboutData = createAsyncThunk(
  "home/about",
  async (aboutData: HomeAbout & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/about/update?id=${aboutData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: aboutData.title,
            desc: aboutData.descriptions,
          }),
        },
      );

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

export const deleteAboutData = createAsyncThunk(
  "home/about",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/about/del?id=${id}`, {
        method: "DELETE",
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
  about: HomeAbout | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: HomeState = {
  about: null,
  loading: false,
  error: null,
  success: false,
};

const homePageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AboutHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(AboutHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
        state.success = true;
      })
      .addCase(AboutHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default homePageSlice.reducer;
