import { BACKEND_URL } from "@/app/api/actions/articleActions";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

// Types
export interface SubUser {
  username: string;
  permissions: string[];
}

interface SubUserState {
  users: SubUser[];
  currentUser: SubUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  permissions?: string[];
}

interface UpdatePermissionsPayload {
  id: number;
  permissions: string[];
}

interface ApiError {
  error?: string;
}

const initialState: SubUserState = {
  users: [],
  currentUser: null,
  token: null,
  loading: false,
  error: null,
  message: null,
};

// Helper for Spring Boot API errors
async function getErrorMessage(response: Response): Promise<string> {
  const data: ApiError = await response.json().catch(() => ({}));
  return data.error || "Something went wrong";
}

// Get all sub-users
export const fetchSubUsers = createAsyncThunk<
  SubUser[],
  void,
  { rejectValue: string }
>("subUsers/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/sub-user/all`);

    if (!response.ok) {
      return rejectWithValue(await getErrorMessage(response));
    }

    const data = await response.json();

    return data.map(
      (user: { id: number; email: string; permissions?: string[] }) => ({
        id: user.id,
        username: user.email,
        permissions: user.permissions ?? [],
      }),
    );
  } catch {
    return rejectWithValue("Unable to connect to server");
  }
});

// Register without permissions
export const registerSubUser = createAsyncThunk<
  SubUser,
  LoginPayload,
  { rejectValue: string }
>("subUsers/register", async (payload, { rejectWithValue }) => {
  try {
    const body = new URLSearchParams({
      username: payload.username,
      password: payload.password,
    });

    const response = await fetch(`${BACKEND_URL}/sub-user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!response.ok) {
      return rejectWithValue(await getErrorMessage(response));
    }

    const data = await response.json();

    return {
      id: data.id,
      username: data.username,
      permissions: [],
    };
  } catch {
    return rejectWithValue("Unable to connect to server");
  }
});

// Register with permissions
export const registerSubUserWithPermissions = createAsyncThunk<
  SubUser,
  RegisterPayload,
  { rejectValue: string }
>("subUsers/registerWithPermissions", async (payload, { rejectWithValue }) => {
  try {
    const body = new URLSearchParams({
      username: payload.username,
      password: payload.password,
    });

    (payload.permissions ?? []).forEach((permission) => {
      body.append("permissions", permission);
    });

    const response = await fetch(
      `${BACKEND_URL}/sub-user/register-with-permissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );

    if (response.status == 409) {
      return rejectWithValue("User already exists");
    }

    if (!response.ok) {
      return rejectWithValue(await getErrorMessage(response));
    }

    const data = await response.json();

    return {
      id: data.id,
      username: data.username,
      permissions: data.permissions ?? [],
    };
  } catch {
    return rejectWithValue("Unable to connect to server");
  }
});

// Login
export const loginSubUser = createAsyncThunk(
  "subUsers/sub-user/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/sub-user/login?username=${payload.username}&password=${payload.password}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (!response.ok) {
        return rejectWithValue(await getErrorMessage(response));
      }

      const data = await response.json();

      return data;
    } catch {
      return rejectWithValue("Unable to connect to server");
    }
  },
);

// Get a sub-user by email
export const fetchSubUserByEmail = createAsyncThunk<
  SubUser,
  string,
  { rejectValue: string }
>("subUsers/fetchByEmail", async (username, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams({ username });

    const response = await fetch(
      `${BACKEND_URL}/by-email?${params.toString()}`,
    );

    if (!response.ok) {
      return rejectWithValue(await getErrorMessage(response));
    }

    const data = await response.json();

    return {
      id: data.id,
      username: data.username,
      permissions: data.permissions ?? [],
    };
  } catch {
    return rejectWithValue("Unable to connect to server");
  }
});

// Update permissions
export const updateSubUserPermissions = createAsyncThunk<
  { id: number; permissions: string[] },
  UpdatePermissionsPayload,
  { rejectValue: string }
>(
  "subUsers/updatePermissions",
  async ({ id, permissions }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/sub-user/permissions?id=${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            // Replace with actual admin password or token
          },
          body: JSON.stringify({ permissions }),
        },
      );

      if (!response.ok) {
        return rejectWithValue(await getErrorMessage(response));
      }

      const data = await response.json();

      return {
        id: data.id,
        permissions: data.permissions ?? [],
      };
    } catch {
      return rejectWithValue("Unable to connect to server");
    }
  },
);

// Redux slice
const subUserSlice = createSlice({
  name: "subUsers",
  initialState,
  reducers: {
    clearSubUserError(state) {
      state.error = null;
    },
    clearSubUserMessage(state) {
      state.message = null;
    },
    logoutSubUser(state) {
      state.token = null;
      state.currentUser = null;
    },
    setCurrentSubUser(state, action: PayloadAction<SubUser | null>) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchSubUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchSubUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch users";
      })

      // Register without permissions
      .addCase(registerSubUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.message = "Sub-user registered successfully";
      })
      .addCase(registerSubUser.rejected, (state, action) => {
        state.error = action.payload ?? "Registration failed";
      })

      // Register with permissions
      .addCase(registerSubUserWithPermissions.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.message = "Sub-user registered successfully";
      })
      .addCase(registerSubUserWithPermissions.rejected, (state, action) => {
        state.error = action.payload ?? "Registration failed";
      })

      // Login
      .addCase(loginSubUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;

        state.message = "Login successful";
      })
      .addCase(loginSubUser.rejected, (state, action) => {
        state.error = "Login failed";
      })

      // Fetch by email
      .addCase(fetchSubUserByEmail.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchSubUserByEmail.rejected, (state, action) => {
        state.error = action.payload ?? "User not found";
      })

      // Update permissions
      // .addCase(updateSubUserPermissions.fulfilled, (state, action) => {
      //   const user = state.users.find((item) => item.id === action.payload.id);

      //   if (user) {
      //     user.permissions = action.payload.permissions;
      //   }

      //   state.message = "Permissions updated successfully";
      // })
      .addCase(updateSubUserPermissions.rejected, (state, action) => {
        state.error = action.payload ?? "Permission update failed";
      });
  },
});

export const {
  clearSubUserError,
  clearSubUserMessage,
  logoutSubUser,
  setCurrentSubUser,
} = subUserSlice.actions;

export default subUserSlice.reducer;
