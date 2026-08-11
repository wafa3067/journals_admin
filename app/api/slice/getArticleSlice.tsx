import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../actions/articleActions";

export interface GetContributor {
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
  underReviewComments: string;
  affiliation: string;
  primaryContact: boolean;
  principleContact: boolean;
  inBrowserlist: boolean;
  productionComments: string;
}

export interface GetArticle {
  id: number;
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
  underReviewComments: string;
  abstracts: string;
  keywords: string;
  userComments: string;
  referenceText: string;
  userProductionComments: string;
  productionComments: string;
  createdAt: string;
  modifyCopyEditor: boolean;
  modifyProduction: boolean;
  contributorsList: GetContributor[];
  finalFile: string | null;
  pdfUrl: string | null;
}

export interface ArticleState {
  articles: GetArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
};

// ✅ Async thunk to fetch articles by user
export const fetchArticlesByUser = createAsyncThunk<
  GetArticle[],
  { userEmail: string; token: string }
>("articles/fetchByUser", async ({}, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const response = await axios.get<GetArticle[]>(
      `${BACKEND_URL}/api/user/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    //console.log("Fetched articles by user:", response.data);
    return response.data;
  } catch (err: unknown) {
    let message = "Login failed";

    if (axios.isAxiosError(err) && err.message) {
      message = String(err.message);
    }
    return rejectWithValue(message);
  }
});

// ✅ Define Article type (match your backend Article model)
export interface UpdateArticle {
  id: number;
  title: string;
  pdfFilePath?: string;
  pdfFileName?: string;
  userComments?: string;
  // add other fields if needed
}

// ✅ Define input type for thunk
export interface UpdatePdfAndCommentsPayload {
  articleId: number;
  pdfFile?: File | null | undefined;
  userComments?: string;
}

interface UploadFinalPayload {
  user: number;
  finalFile: File;
}

export const uploadFinalFile = createAsyncThunk<
  UpdateArticle, // return type
  UploadFinalPayload, // argument type
  { rejectValue: string } // error type
>(
  "article/uploadFinalFile",
  async ({ user, finalFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("user", user.toString());
      formData.append("finalFile", finalFile);
      //console.log("the file is ", finalFile);
      const token = await localStorage.getItem("token");
      const response = await axios.post(
        `${BACKEND_URL}/api/uploadFinal`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // only if you use cookies/auth
        },
      );
      //console.log("Final file upload response:", response.data);
      return response.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data.message);
      }
      return rejectWithValue(message || "File upload failed");
    }
  },
);

// ✅ Async thunk for updating PDF and user comments

export const updatePdfAndComments = createAsyncThunk<
  UpdateArticle, // Return type
  UpdatePdfAndCommentsPayload, // Input type
  { rejectValue: string } // Error type
>(
  "articles/updatePdfAndComments",
  async ({ articleId, pdfFile, userComments }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("articleId", articleId.toString());
      if (pdfFile) formData.append("pdfFile", pdfFile);
      if (userComments) formData.append("userComments", userComments);

      const response = await axios.post<UpdateArticle>(
        `${BACKEND_URL}/api/updatePdfAndComments`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      //console.log("the data us ", response.data);

      return response.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data.message);
      }
      return rejectWithValue(message || "Failed to update PDF and comments");
    }
  },
);

// Async thunk for updating user comment
export const updateUserComment = createAsyncThunk<
  string, // return type
  { userComments: string; articleId: number }, // argument type
  { rejectValue: string } // error type
>(
  "comments/updateUserComment",
  async ({ userComments, articleId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/updateComments?articleId=${articleId}&userComments=${encodeURIComponent(
          userComments,
        )}`,
      );

      return res.data;
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data.message);
      }
      return rejectWithValue(message);
    }
  },
);

export const updateProductionComments = createAsyncThunk<
  string, // return type
  { productionComments: string; articleId: number }, // argument type
  { rejectValue: string } // error type
>(
  "comments/productionComments",
  async ({ productionComments, articleId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/updateProduction?articleId=${articleId}&productionComments=${encodeURIComponent(
          productionComments,
        )}`,
      );
      //console.log("result is ", res.data);
      return res.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message);
    }
  },
);

export const updateUserProductionComments = createAsyncThunk<
  string, // return type
  { userProductionComments: string; articleId: number }, // argument type
  { rejectValue: string } // error type
>(
  "comments/productionComments",
  async ({ userProductionComments, articleId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/updateUserProduction?articleId=${articleId}&productionComments=${encodeURIComponent(
          userProductionComments,
        )}`,
      );

      //console.log("result is ", res.data);
      return res.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message);
    }
  },
);

export const updateProductModification = createAsyncThunk<
  string, // return type
  { production: boolean; articleId: number }, // argument type
  { rejectValue: string } // error type
>(
  "comments/modify_production",
  async ({ production, articleId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/modify_production?articleId=${articleId}&production=${encodeURIComponent(
          production,
        )}`,
      );

      return res.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message);
    }
  },
);
export const updateCopyModification = createAsyncThunk<
  string, // return type
  { production: boolean; articleId: number }, // argument type
  { rejectValue: string } // error type
>(
  "comments/modify_production",
  async ({ production, articleId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/modify_copy?articleId=${articleId}&copy=${encodeURIComponent(
          production,
        )}`,
      );

      return res.data;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message);
    }
  },
);

const getArticleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchArticlesByUser.fulfilled,
        (state, action: PayloadAction<GetArticle[]>) => {
          state.loading = false;
          state.articles = action.payload;
        },
      )
      .addCase(fetchArticlesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default getArticleSlice.reducer;
