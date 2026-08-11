// types/research.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contributor {
  name: string;
  giveName: string;
  publicName: string;
  homeurl: string;
  orcid: string;
  bio: string;
  email: string;
  role: string;
  primaryContact: boolean;
  principleContact: boolean;
  inBrowserlist: boolean;
  country: string;
  affiliation: string;
}
// ✅ Place this BELOW your metaSlice definition
export const checkAllFieldsComplete = (state: metaData): boolean => {
  const requiredFields = [
    state.title,
    state.prefix,
    state.subtitle,
    state.abstracts,
    state.keywords,
    state.references,
  ];

  const allFieldsFilled = requiredFields.every(
    (field) => field && field.trim() !== "",
  );

  const hasContributor = state.contributorsList.length > 0;

  // Check required contributor fields
  const contributorsValid = hasContributor
    ? state.contributorsList.every((contributor) => {
        const { name, giveName, publicName, email, country } = contributor;
        return (
          name.length !== 0 &&
          giveName.length !== 0 &&
          publicName.length !== 0 &&
          email.length !== 0 &&
          country.length !== 0
        );
      })
    : false;
  //console.log("the ", allFieldsFilled, "and", contributorsValid);
  return allFieldsFilled && contributorsValid;
};

export interface metaData {
  //meta data
  prefix: string;
  title: string;
  subtitle: string;
  abstracts: string;
  contributorsList: Contributor[];
  keywords: string;
  references: string;
  primary: boolean;
  browser: number;
  //no usage
}

export const initialState: metaData = {
  title: "",
  prefix: "",
  subtitle: "",
  abstracts: "",
  keywords: "",
  references: "",
  primary: true,
  browser: 999999,
  contributorsList: [],
};

// store/slices/researchSlice.ts
// store/slices/researchSlice.ts

const metaSlice = createSlice({
  name: "research",
  initialState,
  reducers: {
    // Individual field updates
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    updatePrefix: (state, action: PayloadAction<string>) => {
      state.prefix = action.payload;
    },

    updateSubtitle: (state, action: PayloadAction<string>) => {
      state.subtitle = action.payload;
    },

    updateAbstracts: (state, action: PayloadAction<string>) => {
      state.abstracts = action.payload;
    },

    updateKeywords: (state, action: PayloadAction<string>) => {
      state.keywords = action.payload;
    },
    updatePrimary: (state, action: PayloadAction<boolean>) => {
      state.primary = action.payload;
    },
    updateBrowswe: (state, action: PayloadAction<number>) => {
      state.browser = action.payload;
    },

    updateReferences: (state, action: PayloadAction<string>) => {
      state.references = action.payload;
    },

    // Contributors management
    addContributor: (state, action: PayloadAction<Contributor>) => {
      state.contributorsList.push(action.payload);
    },

    updateContributor: (
      state,
      action: PayloadAction<{
        index: number;
        contributor: Partial<Contributor>;
      }>,
    ) => {
      const { index, contributor } = action.payload;
      if (index >= 0 && index < state.contributorsList.length) {
        state.contributorsList[index] = {
          ...state.contributorsList[index],
          ...contributor,
        };
      }
    },

    removeContributor: (state, action: PayloadAction<number>) => {
      state.contributorsList.splice(action.payload, 1);
    },

    setPrimaryContact: (state, action: PayloadAction<number>) => {
      // Reset all primary contacts
      state.contributorsList.forEach((contributor: Contributor) => {
        contributor.primaryContact = false;
      });
      // Set the new primary contact
      if (
        action.payload >= 0 &&
        action.payload < state.contributorsList.length
      ) {
        state.contributorsList[action.payload].primaryContact = true;
      }
    },

    reorderContributors: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>,
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.contributorsList.splice(fromIndex, 1);
      state.contributorsList.splice(toIndex, 0, removed);
    },

    // Bulk actions
    setResearchData: (state, action: PayloadAction<Partial<metaData>>) => {
      return { ...state, ...action.payload };
    },

    resetResearch: () => {
      return initialState;
    },
  },
});

export const {
  // Individual field updates
  updateTitle,
  updatePrefix,
  updateSubtitle,
  updateAbstracts,
  updateKeywords,
  updateReferences,
  updateBrowswe,
  updatePrimary,
  // Contributors management
  addContributor,
  updateContributor,
  removeContributor,
  setPrimaryContact,
  reorderContributors,

  // Bulk actions
  setResearchData,
  resetResearch,
} = metaSlice.actions;

export default metaSlice.reducer;
