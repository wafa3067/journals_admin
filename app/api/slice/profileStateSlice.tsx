import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  reviewes: string;
  reader: boolean;
  author: boolean;
  reviewer: boolean;
  fileName: File | string | null;
  bio: string;
  homeurl: string;
  orcid_id: string;
  profile: File | string | null;
  givenName: string;
  familyName: string;
  publicName: string;
  Signature: string;
  Phone: string;
  Affiliation: string;
  username: string;
  Mailing: string;
  Country: string;
  english: boolean;
  arabic: boolean;
}

const initialState: ProfileState = {
  reviewes: "",
  username: "",
  reader: false,
  author: false,
  reviewer: false,
  fileName: null,
  bio: "",
  homeurl: "",
  orcid_id: "",
  profile: null,
  givenName: "",
  familyName: "",
  publicName: "",
  Signature: "",
  Phone: "",
  Affiliation: "",
  Mailing: "",
  Country: "",
  english: false,
  arabic: false,
};

export const profileStateSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // ✅ set data after fetching from backend
    setProfileData: (state, action) => {
      const V = action.payload;
      state.familyName = V.payload["familyName"];
      state.username = V.payload["username"];
      state.givenName = V.payload["givenName"];
      state.publicName = V.payload["publicName"];
      state.Signature = V.payload["signature"];
      state.Phone = V.payload["phone"];
      state.Affiliation = V.payload["affiliation"];
      state.Mailing = V.payload["maillingAddress"];
      state.Country = V.payload["country"];

      if (V.payload["languagesList"]?.length > 0) {
        state.english = V.payload["languagesList"][0]?.name ? true : false;
        state.arabic = V.payload["languagesList"][1]?.name ? true : false;
      }

      state.bio = V.payload["bio"] ?? "";
      state.homeurl = V.payload["homeurl"] ?? "";
      state.orcid_id = V.payload["orcid_id"] ?? "";
      state.profile = V.payload["profile"] ?? null;

      state.reviewes = V.payload["review"];
      if (V.payload["role"]?.length > 0) {
        state.reader = V.payload["role"][0]?.name ? true : false;
        state.author = V.payload["role"][1]?.name ? true : false;
        state.reviewer = V.payload["role"][2]?.name ? true : false;
      }
    },

    // ✅ same as your individual setters
    setFamilyName: (state, action: PayloadAction<string>) => {
      state.familyName = action.payload;
    },
    setGivenName: (state, action: PayloadAction<string>) => {
      state.givenName = action.payload;
    },
    setPublicName: (state, action: PayloadAction<string>) => {
      //console.log("Setting public name to:", action.payload);
      state.publicName = action.payload;
    },
    setSignature: (state, action: PayloadAction<string>) => {
      state.Signature = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.Phone = action.payload;
    },
    setAffiliation: (state, action: PayloadAction<string>) => {
      state.Affiliation = action.payload;
    },
    setMailing: (state, action: PayloadAction<string>) => {
      state.Mailing = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.Country = action.payload;
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
    setHomeurl: (state, action: PayloadAction<string>) => {
      state.homeurl = action.payload;
    },
    setOrcid_id: (state, action: PayloadAction<string>) => {
      state.orcid_id = action.payload;
    },
    setProfile: (state, action: PayloadAction<File | string | null>) => {
      state.profile = action.payload;
    },
    setFileName: (state, action: PayloadAction<File | string | null>) => {
      state.fileName = action.payload;
    },
    setEnglish: (state, action: PayloadAction<boolean>) => {
      state.english = action.payload;
    },
    setArabic: (state, action: PayloadAction<boolean>) => {
      state.arabic = action.payload;
    },
    setReviewes: (state, action: PayloadAction<string>) => {
      state.reviewes = action.payload;
    },
    setReader: (state, action: PayloadAction<boolean>) => {
      state.reader = action.payload;
    },
    setAuthor: (state, action: PayloadAction<boolean>) => {
      state.author = action.payload;
    },
    setReviewer: (state, action: PayloadAction<boolean>) => {
      state.reviewer = action.payload;
    },
  },
});

export const {
  setProfileData,
  setFamilyName,
  setGivenName,
  setPublicName,
  setSignature,
  setPhone,
  setAffiliation,
  setMailing,
  setCountry,
  setBio,
  setHomeurl,
  setOrcid_id,
  setProfile,
  setEnglish,
  setArabic,
  setReviewes,
  setReader,
  setAuthor,
  setReviewer,
  setFileName,
} = profileStateSlice.actions;

export default profileStateSlice.reducer;
