import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/slice/auth";
import loginReducer from "../api/slice/login";
import beginSlice from "../api/slice/beginSlice";
import uploadSlice from "../api/slice/uploadSlice";
import metaSlice from "../api/slice/metaData";
import tabSlice from "../api/providers/tab_bar";
import articleuploadSlice from "../api/slice/articleSlice";
import getArticleSlice from "../api/slice/getArticleSlice";
import getTokenSlice from "../api/slice/getTokenSlice";
import userSlice from "../api/slice/profileSlice";
import updateidentitySlice from "../api/slice/updateidentitySlice";
import contactSlice from "../api/slice/updateContactSlice";
import roleSlice from "../api/slice/roleSlice";
import updatePublicProfile from "../api/slice/publicSlice";
import updatePassword from "../api/slice/passwordSlice";
import profileStateSlice from "../api/slice/profileStateSlice";
import getCountArticles from "../api/slice/fetchArticaleCount";
import viewSlice from "../api/slice/viewSlice";
import authSlice from "../api/slice/tokenCheck";
import pendingReducer from "../admin/adminSlice/pending";
import underReviewSlice from "../admin/adminSlice/underreviewSlice";
import copyEditSlice from "../admin/adminSlice/copyeditorSlice";
import rejectArticleStatusSlice from "../admin/adminSlice/rejectArticalStatusSlice";
import RejectedDataSlice from "../admin/adminSlice/rejectedDataslice";
import productionSlice from "../admin/adminSlice/productionSlice";
import approvedSlice from "../admin/adminSlice/approved";
import userDataSlice from "../admin/adminSlice/userSlice";
import UpdateUserSlice from "../admin/adminSlice/updateUserSlice";
import findArticleByIdSlice from "../api/slice/getArticleByIdSlice";
import notificationSlice from "../admin/adminSlice/notificationSlice";
import adminAuthReducer from "../admin/adminSlice/adminAuthSlice";
import getNotificationSlice from "../api/slice/getNotificationSlice";
import archiveReducer from "../api/slice/archiveSlice";
import articleReducer from "../api/reducers/articleReducer"; // Handle search state here
import homePageSlice from "../admin/adminSlice/home/homePageSlice";
import getHomeAboutSlice from "../admin/adminSlice/home/GetHomeAboutSlice";
import addSideHomeSlice from "../admin/adminSlice/sideHomeSlice/addSideHomeSlice";
import getSideHome from "../admin/adminSlice/sideHomeSlice/getHomeSideSlice";
import addEditorHome from "../admin/adminSlice/editor/addEditorSlice";
import getEditorHome from "../admin/adminSlice/editor/getEditorSlice";
import addTeamPage from "../admin/adminSlice/team/addTeamSlice";
import getTeam from "../admin/adminSlice/team/getTeamSlice";
import addContactPage from "../admin/adminSlice/contact/addContactSlice";
import getContactSlice from "../admin/adminSlice/contact/getContactSlice";
import addAuthorPage from "../admin/adminSlice/author/addAuthorSlice";
import getAuthorSlice from "../admin/adminSlice/author/getAuthorSlice";
import addNewsPage from "../admin/adminSlice/news/newsAddSlice";
import getNews from "../admin/adminSlice/news/newsGetSlice";
import addAnnouncement from "../admin/adminSlice/announcement/addAnnouncementSlice";
import getAnnouncement from "../admin/adminSlice/announcement/getAnnouncementSlice";
import AimsPage from "../admin/adminSlice/aims/getAims";
import getContactIngo from "../admin/adminSlice/contact_info/getContactInfo";
import AddAimsPage from "../admin/adminSlice/aims/addAims";
import getPublicationInsights from "../admin/adminSlice/publications/getPublications";
import AddPublication from "../admin/adminSlice/publications/addPublications";
import getAuthorsGuidlines from "../admin/adminSlice/authorsguidlines/getAuthorsGuidlines";
import getJournals from "../admin/adminSlice/journals/getJournals";
import AddJournalsInsights from "../admin/adminSlice/journals/addJournals";
import AddPrivacy from "../admin/adminSlice/privacy/addPrivacy";
import getPrivacyInsights from "../admin/adminSlice/privacy/getPrivacy";

import getCareersData from "../admin/adminSlice/careers/careersGetSlice";
import addCareersPage from "../admin/adminSlice/careers/careersAddSlice";
import addConferencesPage from "../admin/adminSlice/conferences/conferencesAddSlice";
import getConferencesData from "../admin/adminSlice/conferences/conferencesGetSlice";

import addAdvertisingPage from "../admin/adminSlice/advertising/adertisingAddSlice";
import getAdvertisingData from "../admin/adminSlice/advertising/advertisingGetSlice";

import addServicesPage from "../admin/adminSlice/services/servicesAddSlice";
import getServicesData from "../admin/adminSlice/services/servicesGetSlice";
import getPartnershipData from "../admin/adminSlice/partnership/partnershipGetSlice";
import addPartnershipPage from "../admin/adminSlice/partnership/partnershipAddSlice";
let storeInstance: ReturnType<typeof configureStore> | null = null;
//console.log("🧠 Store is being created..."); // 👈 ADD THIS

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      login: loginReducer,
      begin: beginSlice,
      upload: uploadSlice,
      meta: metaSlice,
      tab: tabSlice,
      article: articleuploadSlice,
      getArticle: getArticleSlice,
      token: getTokenSlice,
      user: userSlice,
      updateidentitySlice: updateidentitySlice,
      updateContacts: contactSlice,
      updateRole: roleSlice,
      updatepublic: updatePublicProfile,
      updatePassword: updatePassword,
      profileData: profileStateSlice,
      getCountArticles: getCountArticles,
      view: viewSlice,
      authToken: authSlice,
      pending: pendingReducer,
      underreview: underReviewSlice,
      copy: copyEditSlice,
      applyRejectedStatus: rejectArticleStatusSlice,
      rejectedArtical: RejectedDataSlice,
      production: productionSlice,
      approved: approvedSlice,
      userdata: userDataSlice,
      updateUser: UpdateUserSlice,
      getArticleById: findArticleByIdSlice,
      notificationSlice: notificationSlice,
      getnotification: getNotificationSlice,
      adminAuth: adminAuthReducer,
      archive: archiveReducer,
      searching: articleReducer, // Handle search state here
      homeAdd: homePageSlice,
      homeGet: getHomeAboutSlice,
      getSideHome: getSideHome,
      addSideHome: addSideHomeSlice,
      addEditorHome: addEditorHome,
      getEditorHome: getEditorHome,
      getTeam: getTeam,
      addTeam: addTeamPage,
      addContact: addContactPage,
      getContact: getContactSlice,
      addAuthorSlice: addAuthorPage,
      getAuthorSlice: getAuthorSlice,

      addNews: addNewsPage,
      getNews: getNews,

      addCareers: addCareersPage,
      getCareers: getCareersData,

      addConferences: addConferencesPage,
      getConferences: getConferencesData,

      addAdvertising: addAdvertisingPage,
      getAdvertising: getAdvertisingData,

      addServices: addServicesPage,
      getServices: getServicesData,

      addPartnership: addPartnershipPage,
      getPartnership: getPartnershipData,

      addAnnouncement: addAnnouncement,
      getAnnouncement: getAnnouncement,

      addAims: AddAimsPage,
      getAims: AimsPage,

      getContactInfo: getContactIngo,
      addContactInfo: addContactPage,

      getPublications: getPublicationInsights,
      addPublications: AddPublication,

      getAuthor: getAuthorsGuidlines,
      addAuthor: addAuthorPage,

      getJournals: getJournals,
      addJournals: AddJournalsInsights,

      getPrivacy: getPrivacyInsights,
      addPrivacy: AddPrivacy,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export const store = storeInstance ?? (storeInstance = makeStore());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
