import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "stream/consumers";

export interface Contact {
  firstName?: string;
  lastName?: string;
  emailName?: string;
  phone?: string;
  message?: string;
}

export interface mail {
  email?: string;
  body?: string;
  subject?: string;
}
export const addContactInfo = createAsyncThunk(
  "home/contact",
  async (contactData: Contact, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/contact/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          emailName: contactData.emailName,
          phone: contactData.phone,
          message: contactData.message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save contact data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving contact data");
    }
  },
);

export const sendMail = createAsyncThunk(
  "admin/mail",
  async ({ email, body, subject }: mail, { rejectWithValue }) => {
    try {
      // Axios.post handles headers automatically and does not need JSON.stringify
      const res = await axios.post(
        `${BACKEND_URL}/admin/mail`,
        null, // No body, using query params
        {
          params: {
            email,
            body,
            subject,
          },
        },
      );

      // Axios directly gives you the payload data on success
      return res.data;
    } catch (err: any) {
      // Better error catching that reads backend response messages
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred while saving contact data";
      return rejectWithValue(errorMessage);
    }
  },
);

export const editcontactData = createAsyncThunk(
  "home/contact",
  async (contactData: Contact & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/contact/update?id=${contactData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: contactData.firstName,
            lastName: contactData.lastName,
            emailName: contactData.emailName,
            phone: contactData.phone,
            message: contactData.message,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save contact data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving contact data");
    }
  },
);

export const deletecontactData = createAsyncThunk(
  "home/contact",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/contact/del?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save contact data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving contact data");
    }
  },
);

interface ContactInfo {
  contact: Contact | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactInfo = {
  contact: null,
  loading: false,
  error: null,
  success: false,
};

const AddContactSlice = createSlice({
  name: "contact info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContactInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
        state.success = true;
      })
      .addCase(addContactInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default AddContactSlice.reducer;
