import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../actions/articleActions';

// Define the type for the Article and the initial state
interface Article {
  id: number;
  title: string;
  subtitle: string;
  abstracts: string;
  createdAt: string;
  user: string; // Assuming 'user' is the author
}

interface ArticleState {
  loading: boolean;
  articles: Article[];
  error: string | null;
}

// Define the initial state
const initialState: ArticleState = {
  loading: false,
  articles: [],
  error: null,
};

// Define the async thunk for fetching articles
export const fetchArticles = createAsyncThunk(
  'articles/searchArticles', 
  async (params: { keyword: string, startDate: string, endDate: string, author: string }) => {
    const { keyword, startDate, endDate, author } = params;
    const response = await axios.get(
      `${BACKEND_URL}/api/search?keyword=${keyword}&startDate=${startDate}&endDate=${endDate}&author=${author}`
    );
    return response.data;  // Returning the data that we want to store
  }
);

// Create the slice
const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      });
  },
});

export default articleSlice.reducer;
