// src/app/api/slice/uploadSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../actions/articleActions";

interface Contributor {
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

interface UploadState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UploadState = {
  loading: false,
  error: null,
  success: false,
};

// 🔥 Async thunk for uploading article
export const uploadArticle = createAsyncThunk(
  "article/uploadArticle",
  async (
    {
      token,
      data,
      pdfFile,
      contributors,
    }: {
      token: string;
      data: {
        title: string;
        section: string;
        previousPublished: string;
        fileType: string;
        refrencedUrl: string;
        abstracts: string;
        keywords: string;
        textStyle: string;
        textStylic: string;
        comment: string;
        crosspendingContact: string;
        copyright: string;
        user: string;
        privacypolicy: string;
        referenceText: string;
        prefix: string;
        subtitle: string;
        createdAt: string;
      };

      pdfFile: File;
      contributors: Contributor[];
    },
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData();

      // Append all required fields
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      //console.log(data.createdAt);

      formData.append("pdfFile", pdfFile);
      formData.append("contributorsList", JSON.stringify(contributors));

      const response = await axios.post(`${BACKEND_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(message || "Upload failed. Please try again.");
    }
  },
);

//process final file upload
export const uploadFinalFile = createAsyncThunk(
  "article/uploadFinalFile",
  async (
    {
      token,
      articleId,
      finalFile,
    }: {
      token: string;
      articleId: number;
      finalFile: File;
    },
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData();
      formData.append("finalFile", finalFile);

      const response = await axios.post(
        `${BACKEND_URL}/api/upload/final/${articleId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (err: unknown) {
      let message = "failed";

      if (axios.isAxiosError(err) && err.response) {
        message = String(err.response.data);
      }
      return rejectWithValue(
        message || "Final file upload failed. Please try again.",
      );
    }
  },
);
const articleuploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadArticle.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUploadState } = articleuploadSlice.actions;
export default articleuploadSlice.reducer;
