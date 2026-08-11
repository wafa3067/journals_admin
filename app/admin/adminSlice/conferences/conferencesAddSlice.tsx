import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ConferencesAdd {
  title: string;
  date: string;
  desc: string;
  link: string;
  image: File | null;
}

export interface EditConferences {
  id: number;
  descriptions: string;
  title: string;
  date: string;
  link: string;
}

export const addConferencesPage = createAsyncThunk(
  "home/Conferences",
  async (Conferences: ConferencesAdd, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", Conferences.title);
      formData.append("date", Conferences.date);
      formData.append("desc", Conferences.desc);
      formData.append("link", Conferences.link);
      if (Conferences.image) {
        formData.append("image", Conferences.image);
      }

      const res = await axios.post(
        `${BACKEND_URL}/home/Conferences/add`,
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

export const editConferences = createAsyncThunk(
  "home/Conferences",
  async (
    ConferencesData: EditConferences & { id: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Conferences/update?id=${ConferencesData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descriptions: ConferencesData.descriptions,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save Conferences data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Conferences data");
    }
  },
);

export const deleteConferences = createAsyncThunk(
  "home/Conferences",
  async (ConferencesId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Conferences/del?id=${ConferencesId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return res;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Conferences data");
    }
  },
);

interface ConferencesState {
  Conferences: ConferencesAdd | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ConferencesState = {
  Conferences: null,
  loading: false,
  error: null,
  success: false,
};

const ConferencesPageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addConferencesPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addConferencesPage.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;
      })
      .addCase(addConferencesPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default ConferencesPageSlice.reducer;
