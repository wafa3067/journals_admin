import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";

export interface AddJournals {
  title?: string;
  descriptions?: string;
  bulletsPoints: boolean;
}

export const AddJournalsInsights = createAsyncThunk(
  "home/insight",
  async (insightData: AddJournals, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/insight/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: insightData.title,
          descriptions: insightData.descriptions,
          bulletsPoints: insightData.bulletsPoints,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save insight data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving insight data");
    }
  },
);

export const editinsightData = createAsyncThunk(
  "home/insight",
  async (insightData: AddJournals & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/insight/update?id=${insightData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: insightData.title,
            descriptions: insightData.descriptions,
            bulletsPoints: insightData.bulletsPoints,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save insight data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving insight data");
    }
  },
);

export const deleteinsightData = createAsyncThunk(
  "home/insight",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/insight/del?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save insight data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving insight data");
    }
  },
);

interface AddJournalsState {
  insight: AddJournals | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AddJournalsState = {
  insight: null,
  loading: false,
  error: null,
  success: false,
};

const AddJournalsInsightSlice = createSlice({
  name: "insight",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(AddJournalsInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(AddJournalsInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insight = action.payload;
        state.success = true;
      })
      .addCase(AddJournalsInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default AddJournalsInsightSlice.reducer;
