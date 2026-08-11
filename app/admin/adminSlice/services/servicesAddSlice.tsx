import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface SerivcesAdd {
  title: string;
  date: string;
  desc: string;
  link: string;
  image: File | null;
}

export interface EditSerivces {
  id: number;
  descriptions: string;
  title: string;
  date: string;
  link: string;
}

export const addSerivcesPage = createAsyncThunk(
  "home/Services",
  async (Serivces: SerivcesAdd, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", Serivces.title);
      formData.append("date", Serivces.date);
      formData.append("desc", Serivces.desc);
      formData.append("link", Serivces.link);
      if (Serivces.image) {
        formData.append("image", Serivces.image);
      }

      const res = await axios.post(
        `${BACKEND_URL}/home/Services/add`,
        formData,
      );

      return res;
    } catch (err) {
      return rejectWithValue(
        "An error occurred while saving announcement data",
      );
    }
  },
);

export const editSerivces = createAsyncThunk(
  "home/Serivces",
  async (SerivcesData: EditSerivces & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Services/update?id=${SerivcesData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descriptions: SerivcesData.descriptions,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save Serivces data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Serivces data");
    }
  },
);

export const deleteSerivces = createAsyncThunk(
  "home/Services",
  async (SerivcesId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Services/del?id=${SerivcesId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return res;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Serivces data");
    }
  },
);

interface SerivcesState {
  Serivces: SerivcesAdd | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SerivcesState = {
  Serivces: null,
  loading: false,
  error: null,
  success: false,
};

const SerivcesPageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSerivcesPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addSerivcesPage.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;
      })
      .addCase(addSerivcesPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default SerivcesPageSlice.reducer;
