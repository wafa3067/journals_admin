import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface AdvertisingAdd {
  title: string;
  date: string;
  desc: string;
  link: string;
  image: File | null;
}

export interface EditAdvertising {
  id: number;
  descriptions: string;
  title: string;
  date: string;
  link: string;
}

export const addAdvertisingPage = createAsyncThunk(
  "home/Advertising",
  async (Advertising: AdvertisingAdd, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", Advertising.title);
      formData.append("date", Advertising.date);
      formData.append("desc", Advertising.desc);
      formData.append("link", Advertising.link);
      if (Advertising.image) {
        formData.append("image", Advertising.image);
      }

      const res = await axios.post(
        `${BACKEND_URL}/home/Advertising/add`,
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

export const editAdvertising = createAsyncThunk(
  "home/Advertising",
  async (
    AdvertisingData: EditAdvertising & { id: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Advertising/update?id=${AdvertisingData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descriptions: AdvertisingData.descriptions,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save Advertising data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Advertising data");
    }
  },
);

export const deleteAdvertising = createAsyncThunk(
  "home/Advertising",
  async (AdvertisingId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Advertising/del?id=${AdvertisingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return res;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Advertising data");
    }
  },
);

interface AdvertisingState {
  Advertising: AdvertisingAdd | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AdvertisingState = {
  Advertising: null,
  loading: false,
  error: null,
  success: false,
};

const AdvertisingPageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAdvertisingPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAdvertisingPage.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;
      })
      .addCase(addAdvertisingPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default AdvertisingPageSlice.reducer;
