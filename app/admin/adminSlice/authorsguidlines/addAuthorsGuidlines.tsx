import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "domain";

export interface AddAuthorState {
  title?: string;
  descriptions?: string;
}

export const AddAuthorGuidlines = createAsyncThunk(
  "home/author",
  async (authorData: AddAuthorState, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/author/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: authorData.title,
          descriptions: authorData.descriptions,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save author data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving author data");
    }
  },
);

export const editauthorData = createAsyncThunk(
  "home/author",
  async (authorData: AddAuthorState & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/author/update?id=${authorData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: authorData.title,
            descriptions: authorData.descriptions,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save author data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving author data");
    }
  },
);

export const deleteauthorData = createAsyncThunk(
  "home/author",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/author/del?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save author data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving author data");
    }
  },
);

interface AddAuthorStateIntials {
  author: AddAuthorState | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AddAuthorStateIntials = {
  author: null,
  loading: false,
  error: null,
  success: false,
};

const addAuthorGuidelineSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddAuthorGuidlines.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(AddAuthorGuidlines.fulfilled, (state, action) => {
        state.loading = false;
        state.author = action.payload;
        state.success = true;
      })
      .addCase(AddAuthorGuidlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default addAuthorGuidelineSlice.reducer;
