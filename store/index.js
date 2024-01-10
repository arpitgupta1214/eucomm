import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./searchSlice";
import { podcastReducer } from "./podcastSlice";
import { accountIntegrationReducer } from "./accountIntegrationSlice";
import { uiReducer } from "./uiSlice";
import { Provider as StoreProvider } from "react-redux";

const store = configureStore({
  reducer: {
    search: searchReducer,
    podcast: podcastReducer,
    accountIntegration: accountIntegrationReducer,
    ui: uiReducer,
  },
});

const Provider = ({ children }) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default Provider;
