import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface sideHome {
  image: File;
}

export const createSideHomeSlice = createAsyncThunk(
  "home/about",
  async (aboutData: { image: File }, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.append("image", aboutData.image);
      const res = await fetch(`${BACKEND_URL}/home/side/add`, {
        method: "POST",

        body: form,
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

export const editSideData = createAsyncThunk(
  "home/side",
  async (sideData: { image: File } & { id: number }, { rejectWithValue }) => {
    try {
      const form = new FormData();
      form.append("image", sideData.image);
      const res = await fetch(
        `${BACKEND_URL}/home/side/update?id=${sideData.id}`,
        {
          method: "PATCH",

          body: form,
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to save side data");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving side data");
    }
  },
);

export const deleteSideData = createAsyncThunk(
  "home/side/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/side/del?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to save side data");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving side data");
    }
  },
);

interface SideHomeState {
  about: sideHome | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SideHomeState = {
  about: null,
  loading: false,
  error: null,
  success: false,
};

const addSideHomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSideHomeSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSideHomeSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
        state.success = true;
      })
      .addCase(createSideHomeSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default addSideHomeSlice.reducer;
