import { createSlice } from "@reduxjs/toolkit";

export interface token {
  token: string;
  user: string;
  loading?: boolean;
}
const initialState: token = {
  token: "",
  user: "",
  loading: false,
};

const getTokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    getToken: (state, action) => {
      const storedToken = localStorage.getItem("token");
      state.token = storedToken ? storedToken : "";
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { getToken, getUser, removeToken } = getTokenSlice.actions;
export default getTokenSlice.reducer;
