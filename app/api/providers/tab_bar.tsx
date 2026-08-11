import { createSlice } from "@reduxjs/toolkit";

export interface tab {
  selectedTab: string;
}

const initialState: tab = {
  selectedTab: "",
};

const tabBarSlice = createSlice({
  name: "tab",
  initialState: initialState,
  reducers: {
    updateTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { updateTab } = tabBarSlice.actions;
export default tabBarSlice.reducer;
