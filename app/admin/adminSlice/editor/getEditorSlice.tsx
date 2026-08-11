import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface GetEditorHomeState {
  id: number;
  image: string;
  title: string;
  descriptions: string;
}

export const CreateEditorHomeState = createAsyncThunk(
  "home/editor",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/editor/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const editorerrorData = await res.json();
        return rejectWithValue(
          editorerrorData.message || "Failed to save editor data",
        );
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(
        "An editorerror occurred while saving editor data",
      );
    }
  },
);

interface GetEditorState {
  editor: GetEditorHomeState[];
  editorloading: boolean;
  editorerror: string | null;
  editorsuccess: boolean;
}

const initialState: GetEditorState = {
  editor: [],
  editorloading: false,
  editorerror: null,
  editorsuccess: false,
};

export const editAboutData = createAsyncThunk(
  "home/about",
  async (aboutData: GetEditorHomeState, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/editor/update?id=${aboutData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: aboutData.title,
            desc: aboutData.descriptions,
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

export const deleteAboutData = createAsyncThunk(
  "home/about",
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

const getEditorHomeStateSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateEditorHomeState.pending, (state) => {
        state.editorloading = true;
        state.editorerror = null;
        state.editorsuccess = false;
      })
      .addCase(CreateEditorHomeState.fulfilled, (state, action) => {
        state.editorloading = false;
        state.editor = action.payload;
        state.editorsuccess = true;
      })
      .addCase(CreateEditorHomeState.rejected, (state, action) => {
        state.editorloading = false;
        state.editorerror = action.payload as string;
        state.editorsuccess = false;
      });
  },
});

export default getEditorHomeStateSlice.reducer;
