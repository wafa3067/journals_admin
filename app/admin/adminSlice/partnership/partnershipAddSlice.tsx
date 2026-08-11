import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface PartnershipAdd {
  title: string;
  date: string;
  desc: string;
  link: string;
  image: File | null;
}

export interface EditPartnership {
  id: number;
  descriptions: string;
  title: string;
  date: string;
  link: string;
}

export const addPartnershipPage = createAsyncThunk(
  "home/Partnership",
  async (Partnership: PartnershipAdd, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", Partnership.title);
      formData.append("date", Partnership.date);
      formData.append("desc", Partnership.desc);
      formData.append("link", Partnership.link);
      if (Partnership.image) {
        formData.append("image", Partnership.image);
      }

      const res = await axios.post(
        `${BACKEND_URL}/home/Partnership/add`,
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

export const editPartnership = createAsyncThunk(
  "home/Partnership",
  async (
    PartnershipData: EditPartnership & { id: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Partnership/update?id=${PartnershipData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descriptions: PartnershipData.descriptions,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save Partnership data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Partnership data");
    }
  },
);

export const deletePartnership = createAsyncThunk(
  "home/Partnership",
  async (PartnershipId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/Partnership/del?id=${PartnershipId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return res;
    } catch (err) {
      return rejectWithValue("An error occurred while saving Partnership data");
    }
  },
);

interface PartnershipState {
  Partnership: PartnershipAdd | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PartnershipState = {
  Partnership: null,
  loading: false,
  error: null,
  success: false,
};

const PartnershipPageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPartnershipPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addPartnershipPage.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;
      })
      .addCase(addPartnershipPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default PartnershipPageSlice.reducer;
