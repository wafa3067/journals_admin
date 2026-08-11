import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface NewsAdd {
  title: string;
  date: string;
  desc: string;
  link: string;
  image: File | null;
}

export interface EditNews {
  id: number;
  descriptions: string;
  title: string;
  date: string;
  link: string;
}

export const addNewsPage = createAsyncThunk(
  "home/news",
  async (news: NewsAdd, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", news.title);
      formData.append("date", news.date);
      formData.append("desc", news.desc);
      formData.append("link", news.link);
      if (news.image) {
        formData.append("image", news.image);
      }

      const res = await axios.post(`${BACKEND_URL}/home/news/add`, formData);

      return res;
    } catch (err) {
      return rejectWithValue(
        "An error occurred while saving announcement data",
      );
    }
  },
);

export const editNews = createAsyncThunk(
  "home/news",
  async (newsData: EditNews & { id: number }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/home/news/update?id=${newsData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descriptions: newsData.descriptions,
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to save news data");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("An error occurred while saving news data");
    }
  },
);

export const deleteNews = createAsyncThunk(
  "home/news",
  async (newsId: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/home/news/del?id=${newsId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res;
    } catch (err) {
      return rejectWithValue("An error occurred while saving news data");
    }
  },
);

interface NewsState {
  news: NewsAdd | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: NewsState = {
  news: null,
  loading: false,
  error: null,
  success: false,
};

const NewsPageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewsPage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addNewsPage.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;
      })
      .addCase(addNewsPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default NewsPageSlice.reducer;
