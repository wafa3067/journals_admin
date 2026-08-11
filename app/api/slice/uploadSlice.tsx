import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface upload {
  pdf: File | null | string;
  name: string;
  type: string;
  size: number;
  file: File | null | string;
}

const intialdata: upload = {
  pdf: "",
  name: "",
  type: "",
  size: 0,
  file: "",
};

const uploadSlice = createSlice({
  name: "upload",
  initialState: intialdata,
  reducers: {
    updatePdf: (state, action: PayloadAction<File>) => {
      state.pdf = action.payload;
    },
    updateFile: (state, action: PayloadAction<File>) => {
      state.file = action.payload;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    updateSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
  },
});
export const { updatePdf, updateFile, updateName, updateSize, updateType } =
  uploadSlice.actions;
export default uploadSlice.reducer;
