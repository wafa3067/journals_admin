import { createSlice } from "@reduxjs/toolkit";

export interface viewState {
  tab: string;
}

const initialState: viewState = {
  tab: "",
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});
export const { setTab } = viewSlice.actions;
export default viewSlice.reducer;
