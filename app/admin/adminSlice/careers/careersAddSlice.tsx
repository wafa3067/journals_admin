import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CareersAdd {
  title: string;
  date: string;
  desc: string;
  link: string;
  image: File | null;
}

export interface EditCareers {
  id: number;
  descriptions: string;
  title: string;
  date: string;
  link: string;
}

export const addCareersPage = createAsyncThunk(
  "home/Careers",
  async (Careers: CareersAdd, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", Careers.title);
      formData.append("date", Careers.date);
      formData.append("desc", Careers.desc);
      formData.append("link", Careers.link);
      if (Careers.image) {
        formData.append("image", Careers.image);
      }

      const res = await axios.post(`${BACKEND_URL}/home/Careers/add`, formData);

      return res;
    } catch (err) {
      return rejectWithValue(
        "An error occurred while saving announcement data",
      );
    }
  },
);

export const editCareers = createAsyncThunk(
  "home/Careers",
  async (CareersData: EditCareers & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Careers/update?id=${CareersData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descriptions: CareersData.descriptions,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save Careers data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Careers data");
    }
  },
);

export const deleteCareers = createAsyncThunk(
  "home/Careers",
  async (CareersId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Careers/del?id=${CareersId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return res;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Careers data");
    }
  },
);

interface CareersState {
  Careers: CareersAdd | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CareersState = {
  Careers: null,
  loading: false,
  error: null,
  success: false,
};

const CareersPageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCareersPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCareersPage.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;
      })
      .addCase(addCareersPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default CareersPageSlice.reducer;
