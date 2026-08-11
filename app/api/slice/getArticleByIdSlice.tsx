import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../actions/articleActions";

// Define TypeScript type for Article
export interface Contributor {
  id: number;
  name: string;
  giveName: string;
  publicName: string;
  homeurl: string;
  orcid: string;
  bio: string;
  email: string;
  role: string;
  country: string;
  affiliation: string;
  primaryContact: boolean;
  principleContact: boolean;
  inBrowserlist: boolean;
}

export interface Article {
  id: number;
  reviewerComment: string | null;
  section: string;
  previousPublished: string;
  fileType: string;
  refrencedUrl: string;
  textStyle: string;
  textStylic: string;
  comment: string;
  copyright: string;
  privacypolicy: string;
  pdf: string;
  status: string;
  user: string;
  approvedBy: string;
  prefix: string;
  title: string;
  subtitle: string;
  abstracts: string;
  keywords: string;
  referenceText: string;
  createdAt: string;
  contributorsList: Contributor[];
  reviewerAssigned: string;
  submittedOn: string | null;
  reviewStarted: string | null;
  reviewDeadline: string | null;
  doi: string;
  volumeIssue: string | null;
  productionNotes: string;
  copyeditorNotes: string | null;
  reviewStartDate: string;
  reviewEndDate: string;
  copyeditor: string;
  stage: string;
}

// Async thunk to fetch an article
export const fetchArticleById = createAsyncThunk(
  "article/fetchById",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get<Article>(
        `${BACKEND_URL}/api/article/${id}`,
      );
      return response.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return thunkAPI.rejectWithValue(message);
    }
  },
);

interface ArticleState {
  article: Article | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  article: null,
  loading: false,
  error: null,
};

export const findArticleByIdSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    clearArticle: (state) => {
      state.article = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.loading = false;
          state.article = action.payload;
        },
      )
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearArticle } = findArticleByIdSlice.actions;
export default findArticleByIdSlice.reducer;
