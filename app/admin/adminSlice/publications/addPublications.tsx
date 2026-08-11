import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Publication {
  title?: string;
  descriptions?: string;
  bullets: boolean;
}

export const AddPublication = createAsyncThunk(
  "home/publication",
  async (publicationData: Publication, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/publication/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: publicationData.title,
          descriptions: publicationData.descriptions,
          bullets: publicationData.bullets,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save publication data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving publication data");
    }
  },
);

export const editpublicationData = createAsyncThunk(
  "home/publication",
  async (
    publicationData: Publication & { id: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/publication/update?id=${publicationData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: publicationData.title,
            descriptions: publicationData.descriptions,
            bullets: publicationData.bullets,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save publication data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving publication data");
    }
  },
);

export const deletepublicationData = createAsyncThunk(
  "home/publication",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/publication/del?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save publication data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving publication data");
    }
  },
);

interface PublicaionState {
  publication: Publication | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PublicaionState = {
  publication: null,
  loading: false,
  error: null,
  success: false,
};

const AddPublicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddPublication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(AddPublication.fulfilled, (state, action) => {
        state.loading = false;
        state.publication = action.payload;
        state.success = true;
      })
      .addCase(AddPublication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default AddPublicationSlice.reducer;
