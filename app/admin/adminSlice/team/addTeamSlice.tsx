import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Team {
  id: number;
  title?: string;
  descriptions?: string;
  heading?: string;
  email?: string;
  link?: string;
  affiliation?: string;
  uni?: string;
  category?: number;
}

export interface EditTeam {
  title?: string;
  descriptions?: string;
  heading?: string;
  email?: string;
  link?: string;
  affiliation?: string;
  uni?: string;
}

export const addTeamPage = createAsyncThunk(
  "home/about",
  async (aboutData: Team, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/team/add?title=${aboutData.title}&heading=${aboutData.heading}&email=${aboutData.email}&link=${aboutData.link}&affiliation=${aboutData.affiliation}&uni=${aboutData.uni}&cat=${aboutData.category}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

export const editTeam = createAsyncThunk(
  "home/about",
  async (aboutData: EditTeam & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/team/update?id=${aboutData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: aboutData.title,
          desc: aboutData.descriptions,
          heading: aboutData.heading,
          email: aboutData.email,
          link: aboutData.link,
          affiliation: aboutData.affiliation,
          uni: aboutData.uni,
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

export const deleteCategory = createAsyncThunk(
  "home/about",
  async (aboutData: EditTeam & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/category/del?id=${aboutData.id}`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
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

export const updateOrder = createAsyncThunk(
  "home/about",
  async (
    aboutData: {
      catid: number;
      catValue: number;
      changeID: number;
      changeValue: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/category/updateOrder?catId=${aboutData.catid}&catValue=${aboutData.catValue}&changeCatId=${aboutData.changeID}&changeValue=${aboutData.changeValue}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
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

export const deleteTeam = createAsyncThunk(
  "home/about",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/team/del?id=${id}`, {
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

export const addCategoryIntial = createAsyncThunk(
  "home/about",
  async (
    categoryData: { name: string; assignOrder: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/category/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: categoryData.name,
          assignOrder: categoryData.assignOrder,
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

export const editCategory = createAsyncThunk(
  "home/about",
  async (categoryData: { name: string; id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/category/update?id=${categoryData.id}&title=${categoryData.name}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
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

interface TeamState {
  team: Team | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TeamState = {
  team: null,
  loading: false,
  error: null,
  success: false,
};

const TeamPageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTeamPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addTeamPage.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
        state.success = true;
      })
      .addCase(addTeamPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default TeamPageSlice.reducer;
