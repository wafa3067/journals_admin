import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../actions/articleActions";
export interface Language {
  name: string;
}
export interface Contact {
  signature?: string;
  phone?: string;
  maillingAddress?: string;
  affiliation?: string;
  country?: string;
  languagesList?: Language[];
}

interface UserState {
  user: Contact | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

// ✅ Async thunk for updating contact
export const updateContact = createAsyncThunk<
  string, // return type (the success message)
  { updatedUser: Contact }, // payload
  { rejectValue: string } // error type
>("user/updateContact", async ({ updatedUser }, { rejectWithValue }) => {
  try {
    // get token (optional)
    const token = await localStorage.getItem("token");
    const email = await localStorage.getItem("email");

    const res = await axios.post(
      `${BACKEND_URL}/api/update/contact?email=${email}`,
      updatedUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    //console.log("value is ", res.data);
    return res.data as string;
  } catch (error: unknown) {
    let message = "Failed to update contact";
    if (axios.isAxiosError(error) && error.response) {
      message = String(error.response.data);
    }
    return rejectWithValue(message);
  }
});

const ContactSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(
        updateContact.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.message = action.payload;
        },
      )
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearMessage } = ContactSlice.actions;
export default ContactSlice.reducer;
