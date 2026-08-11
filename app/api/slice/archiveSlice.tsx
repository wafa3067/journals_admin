import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../actions/articleActions";

export interface ArchiveArticle {
  id: number;
  reviewerComment?: string;
  underReviewComments?: string;
  userComments?: string;
  userProductionComments?: string;
  productionComments?: string;

  modifyCopyEditor: boolean;
  modifyProduction: boolean;

  section?: string;
  previousPublished?: string;
  fileType?: string;
  refrencedUrl?: string;
  textStyle?: string;
  textStylic?: string;

  comment?: string;
  copyright?: string;
  privacypolicy?: string;

  // PDF related
  pdfData?: Uint8Array; // byte[] → Uint8Array
  pdfUrl?: string;
  finalFile?: string;

  pdfFileName?: string;
  pdfContentType?: string;

  pdf?: string;
  status?: string;
  user?: string;
  approvedBy?: string;

  prefix?: string;
  title?: string;
  subtitle?: string;

  abstracts?: string;
  keywords?: string;
  referenceText?: string;

  createdAt?: string; // ISO string (e.g. 2026-01-12)

  // Review & production workflow
  reviewerAssigned?: string;
  submittedOn?: string;
  reviewStarted?: string;
  reviewDeadline?: string;

  doi?: string;
  volumeIssue?: string;

  productionNotes?: string;
  copyeditorNotes?: string;

  reviewStartDate?: string;
  reviewEndDate?: string;

  copyeditor?: string;
  stage?: string;
}

/* ------------------ HELPERS ------------------ */
const normalizeDate = (dateStr: string) =>
  new Date(dateStr).toISOString().split("T")[0];

/* ------------------ THUNK ------------------ */
export const fetchArchiveArticles = createAsyncThunk<
  ArchiveArticle[],
  void,
  { rejectValue: string }
>("archive/fetchByUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/admin/approved`);

    return response.data;
  } catch (err: unknown) {
    let message = " failed";

    if (axios.isAxiosError(err) && err.message) {
      message = String(err.message);
    }
    return rejectWithValue(message);
  }
});

/* ------------------ SLICE ------------------ */
/* ------------------ SLICE ------------------ */
const archiveSlice = createSlice({
  name: "archive",
  initialState: {
    data: [] as ArchiveArticle[], // ✅ use ArchiveArticle instead of any
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchiveArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArchiveArticles.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload.map((article: ArchiveArticle) => ({
          ...article,
          createdAt: article.createdAt
            ? normalizeDate(article.createdAt)
            : undefined, // handle possible undefined
        }));
      })
      .addCase(fetchArchiveArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load articles";
      });
  },
});

export default archiveSlice.reducer;
