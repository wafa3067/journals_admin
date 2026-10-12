
import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Article } from "../underreviewSlice";

const API_URL =BACKEND_URL;

export interface Assignment {
  id: number;
  reviewerId: number;
  articleId: number;
  status: string;
}

interface AssignmentResponse {
  message: string;
  assignmentId: number;
  reviewerId?: number;
  articleId?: number;
  status?: string;
}

interface AssignmentState {
  assignments: AssignedArticleDTO[];
  reviewersForArticle: Assignment[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: AssignmentState = {
  assignments: [],
  reviewersForArticle: [],
  loading: false,
  error: null,
  success: null,
};

// 1. Assign article to reviewer
export const assignArticle = createAsyncThunk<
  AssignmentResponse,
  { reviewerId: number; articleId: number },
  { rejectValue: string }
>(
  "assigned/assignArticle",
  async ({ reviewerId, articleId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/assigned/reviewer/add?reviewerId=${reviewerId}&articleId=${articleId}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to assign article");
      }

      return data;
    } catch {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

export interface AssignedArticleDTO {
  article: Article;
  status: string;
  id: number; // This is the assignment ID
}
// 2. Get all articles assigned to a reviewer
export const getAssignedArticles = createAsyncThunk<
  AssignedArticleDTO[],
  number,
  { rejectValue: string }
>(
  "assigned/getAssignedArticles",
  async (reviewerId, { rejectWithValue }) => {
    try {
        
      const response = await fetch(
        `${API_URL}/assigned/reviewer/getall?reviewerId=${reviewerId}`
      );
 console.log("Fetched assignments:", response.body);
      const data = await response.json();
 
      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to fetch assignments");
      }
       // Debugging line
      return data;
    } catch {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

// 3. Get reviewers assigned to an article
export const getReviewersForArticle = createAsyncThunk<
  Assignment[],
  number,
  { rejectValue: string }
>(
  "assigned/getReviewersForArticle",
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/assigned/reviewer/id?articleId=${articleId}`
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to fetch reviewers");
      }

      return data;
    } catch {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

// 4. Update assignment status
export const updateAssignmentStatus = createAsyncThunk<
  {  assignmentId: number; status: string },
  { assignmentId: number; status: string },
  { rejectValue: string }
>(
  "assigned/updateStatus",
  async ({ assignmentId, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/assigned/status?assignmentId=${assignmentId}&status=${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to update status");
      }

      return data;
    } catch {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

// 4. Update review comments
export const updateReviewComments = createAsyncThunk<
  {  assignmentId: number; status: string },
  { assignmentId: number; status: string },
  { rejectValue: string }
>(
  "assigned/updateStatus",
  async ({ assignmentId, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/admin/reviewerComment?id=${assignmentId}&reviewerComment=${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to update status");
      }

      return data;
    } catch {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

// 5. Delete assignment
export const deleteAssignment = createAsyncThunk<
  { message: string; assignmentId: number },
  number,
  { rejectValue: string }
>(
  "assigned/deleteAssignment",
  async (assignmentId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/assigned/${assignmentId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to delete assignment");
      }

      return { ...data, assignmentId };
    } catch {
      return rejectWithValue("Unable to connect to server");
    }
  }
);

const assignedSlice = createSlice({
  name: "assigned",
  initialState,
  reducers: {
    clearAssignmentMessages(state) {
      state.error = null;
      state.success = null;
    },
    clearAssignmentLists(state) {
      state.assignments = [];
      state.reviewersForArticle = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // Assign article
      .addCase(assignArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(assignArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(assignArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Assignment failed";
      })

      // Get reviewer assignments
      .addCase(getAssignedArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssignedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(getAssignedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch assignments";
      })

      // Get reviewers for article
      .addCase(getReviewersForArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewersForArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewersForArticle = action.payload;
      })
      .addCase(getReviewersForArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch reviewers";
      })

      // Update status
      .addCase(updateAssignmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateAssignmentStatus.fulfilled, (state, action) => {
        state.loading = false;
      

        const update = (items: Article[]) => {
          const assignment = items.find(
            (item) => item.id === action.payload.assignmentId
          );

          if (assignment) {
            assignment.status = action.payload.status;
          }
        };

        // update(state.assignments);
        // update(state.reviewersForArticle);
      })
      .addCase(updateAssignmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update status";
      })

      // Delete assignment
      .addCase(deleteAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        // state.assignments = state.assignments.filter(
        //   (item) => item.id !== action.payload.assignmentId
        // );

        state.reviewersForArticle = state.reviewersForArticle.filter(
          (item) => item.id !== action.payload.assignmentId
        );
      })
      .addCase(deleteAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete assignment";
      });
  },
});

export const {
  clearAssignmentMessages,
  clearAssignmentLists,
} = assignedSlice.actions;

export default assignedSlice.reducer;
