import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";

export interface Aims {
  title?: string;
  descriptions?: string;
  bulletsPoints: boolean;
}

export const AddAimsPage = createAsyncThunk(
  "home/about",
  async (aboutData: Aims, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/aims/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: aboutData.title,
          descriptions: aboutData.descriptions,
          bulletsPoints: aboutData.bulletsPoints,
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

export const editAims = createAsyncThunk(
  "home/aims",
  async (aboutData: Aims & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/aims/update?id=${aboutData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: aboutData.title,
            descriptions: aboutData.descriptions,
            bulletsPoints: aboutData.bulletsPoints,
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

export const deleteAims = createAsyncThunk(
  "home/aims",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/aims/del?id=${id}`, {
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

interface AimsState {
  about: Aims | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AimsState = {
  about: null,
  loading: false,
  error: null,
  success: false,
};

const AddAimsSlice = createSlice({
  name: "aims",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddAimsPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(AddAimsPage.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
        state.success = true;
      })
      .addCase(AddAimsPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default AddAimsSlice.reducer;
