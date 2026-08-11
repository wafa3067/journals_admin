import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Contact {
  id: number;
  title?: string;
  descriptions?: string;
  type?: string;
}

export interface EditContact {
  id: number;
  title?: string;
  descriptions?: string;
  type?: string;
}

export const addContactPage = createAsyncThunk(
  "home/about",
  async (aboutData: Contact, { rejectWithValue }) => {
    try {
      // Debug log to check the data being sent
      const res = await fetch(`${BACKEND_URL}/contact/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: aboutData.title,
          descriptions: aboutData.descriptions,
          type: aboutData.type,
        }),
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
  async (aboutData: EditContact & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/contact/update?id=${aboutData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: aboutData.title,
            descriptions: aboutData.descriptions,
            type: aboutData.type,
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

export const deleteContact = createAsyncThunk(
  "home/about",
  async (catId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/contact/del?id=${catId}`, {
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

export const addCategory = createAsyncThunk(
  "home/about",
  async (categoryData: { name: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/category/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: categoryData.name,
        }),
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

interface ContactState {
  contact: Contact | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactState = {
  contact: null,
  loading: false,
  error: null,
  success: false,
};

const ContactPageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContactPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addContactPage.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
        state.success = true;
      })
      .addCase(addContactPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default ContactPageSlice.reducer;
