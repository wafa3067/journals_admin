import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface begin {
  section: string;
  comment: string;
  previousPublished: string;
  fileType: string;
  refrencedUrl: string;
  textStylic: string;
  textStyle: string;
  copyright: string;
  privacypolicy: string;
  customError: string;
  setsection: string;
  continue: boolean;
}
const intialData: begin = {
  section: "",
  comment: "",
  previousPublished: "",
  fileType: "",
  refrencedUrl: "",
  textStylic: "",
  textStyle: "",
  copyright: "",
  privacypolicy: "",
  customError: "",
  setsection: "",
  continue: false,
};

// ✅ Add this below your slice
export const checkAllBeginFieldsFilled = (state: begin): boolean => {
  const requiredFields = [
    state.section,
    state.comment,
    state.previousPublished,
    state.fileType,
    state.refrencedUrl,
    state.textStylic,
    state.textStyle,
    state.copyright,
    state.privacypolicy,
    state.setsection,
  ];

  // Every field must be non-empty and trimmed
  const allFilled = requiredFields.every(
    (field) => field && field.trim() !== ""
  );

  return allFilled;
};

const beginSlice = createSlice({
  initialState: intialData,
  name: "beginSlice",
  reducers: {
    updateSection: (state, action: PayloadAction<string>) => {
      state.section = action.payload;
    },

    updatePreviousPublished: (state, action: PayloadAction<string>) => {
      state.previousPublished = action.payload;
    },

    updateFileType: (state, action: PayloadAction<string>) => {
      state.fileType = action.payload;
    },

    updateRefrencedUrl: (state, action: PayloadAction<string>) => {
      state.refrencedUrl = action.payload;
    },

    updateTextStyle: (state, action: PayloadAction<string>) => {
      state.textStyle = action.payload;
    },

    updateTextStylic: (state, action: PayloadAction<string>) => {
      state.textStylic = action.payload;
    },

    updateComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },

    updateCopyright: (state, action: PayloadAction<string>) => {
      state.copyright = action.payload;
    },

    updatePrivacypolicy: (state, action: PayloadAction<string>) => {
      state.privacypolicy = action.payload;
    },
    updateSetSection: (state, action: PayloadAction<string>) => {
      state.setsection = action.payload;
    },
    updateError: (state, action: PayloadAction<string>) => {
      state.customError = action.payload;
    },
    updateContinue: (state, action: PayloadAction<boolean>) => {
      state.continue = action.payload;
    },
  },
});

export const {
  updateSection,
  updatePreviousPublished,
  updateFileType,
  updateRefrencedUrl,
  updateTextStyle,
  updateTextStylic,
  updateComment,
  updateCopyright,
  updatePrivacypolicy,
  updateSetSection,
  updateError,
  updateContinue,
} = beginSlice.actions;

export default beginSlice.reducer;
