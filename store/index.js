import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./searchSlice";
import { podcastReducer } from "./podcastSlice";
import { accountIntegrationReducer } from "./accountIntegrationSlice";
import { uiReducer } from "./uiSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    podcast: podcastReducer,
    accountIntegration: accountIntegrationReducer,
    ui: uiReducer,
  },
});

export default store;
