import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./searchSlice";
import { podcastReducer } from "./podcastSlice";
const store = configureStore({
  reducer: {
    search: searchReducer,
    podcast: podcastReducer,
  },
});

export default store;
