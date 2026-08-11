import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface editorHome {
  image: File | null;
  title: string;
  descriptions: string;
}

export const createEditorHome = createAsyncThunk(
  "home/about",
  async (aboutData: editorHome, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (aboutData.image != null) {
        formData.append("image", aboutData.image);
      }
      formData.append("title", aboutData.title);
      formData.append("descriptions", aboutData.descriptions);

      const res = await axios.post(`${BACKEND_URL}/home/editor/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res;
    } catch (err) {
      return rejectWithValue("An error occurred while saving about data");
    }
  },
);

export const editEditorData = createAsyncThunk(
  "home/editor",
  async (editorData: editorHome & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/editor/update?id=${editorData.id}&title=${editorData.title}&desc=${editorData.descriptions}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editorData.title,
            desc: editorData.descriptions,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save editor data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving editor data");
    }
  },
);

export const deleteEditorData = createAsyncThunk(
  "home/editor/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/editor/del?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(
          errorData.message || "Failed to save editor data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving editor data");
    }
  },
);

interface EditorHomeState {
  about: editorHome | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: EditorHomeState = {
  about: null,
  loading: false,
  error: null,
  success: false,
};

const addEditorHome = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEditorHome.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createEditorHome.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;
      })
      .addCase(createEditorHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default addEditorHome.reducer;
