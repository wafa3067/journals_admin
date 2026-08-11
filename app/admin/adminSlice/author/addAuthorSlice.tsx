import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Author {
  descriptions?: string;
}

export interface EditAuthor {
  id: number;

  descriptions?: string;
}

export const addAuthorPage = createAsyncThunk(
  "home/author/add",
  async (aboutData: { descriptions?: string }, { rejectWithValue }) => {
    try {
      // Debug log to check the data being sent
      // Debug log to check the data being sent
      const res = await fetch(`${BACKEND_URL}/home/author/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: aboutData.descriptions,
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

export const editContact = createAsyncThunk(
  "home/about",
  async (aboutData: EditAuthor & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/author/update?id=${aboutData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descriptions: aboutData.descriptions,
          }),
        },
      );

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

export const deleteAuthor = createAsyncThunk(
  "home/about",
  async (catId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/author/del?id=${catId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res;
    } catch (err) {
      return rejectWithValue("An error occurred while saving about data");
    }
  },
);

interface AuthorState {
  author: Author | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthorState = {
  author: null,
  loading: false,
  error: null,
  success: false,
};

const AuthorPageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAuthorPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAuthorPage.fulfilled, (state, action) => {
        state.loading = false;
        state.author = action.payload;
        state.success = true;
      })
      .addCase(addAuthorPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default AuthorPageSlice.reducer;
