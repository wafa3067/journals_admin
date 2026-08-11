import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Privacy {
  title?: string;
  descriptions?: string;
  bullets: boolean;
}

export const AddPrivacy = createAsyncThunk(
  "home/Privacy",
  async (PrivacyData: Privacy, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/privacy/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: PrivacyData.title,
          descriptions: PrivacyData.descriptions,
          bullets: PrivacyData.bullets,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save Privacy data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Privacy data");
    }
  },
);

export const editPrivacyData = createAsyncThunk(
  "home/privacy",
  async (PrivacyData: Privacy & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/privacy/update?id=${PrivacyData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: PrivacyData.title,
            descriptions: PrivacyData.descriptions,
            bullets: PrivacyData.bullets,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save Privacy data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Privacy data");
    }
  },
);

export const deletePrivacyData = createAsyncThunk(
  "home/Privacy",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/privacy/del?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save Privacy data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Privacy data");
    }
  },
);

interface PrivacyState {
  Privacy: Privacy | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PrivacyState = {
  Privacy: null,
  loading: false,
  error: null,
  success: false,
};

const AddPrivacySlice = createSlice({
  name: "Privacy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddPrivacy.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(AddPrivacy.fulfilled, (state, action) => {
        state.loading = false;
        state.Privacy = action.payload;
        state.success = true;
      })
      .addCase(AddPrivacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default AddPrivacySlice.reducer;
