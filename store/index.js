import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./searchSlice";
import { podcastReducer } from "./podcastSlice";
import { accountIntegrationReducer } from "./accountIntegrationSlice";
const store = configureStore({
  reducer: {
    search: searchReducer,
    podcast: podcastReducer,
    accountIntegration: accountIntegrationReducer,
  },
});

export default store;
