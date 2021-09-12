import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openMenuAccount: {},
};

const accontIntegrationSlice = createSlice({
  name: "accontIntegrationSlice",
  initialState,
  reducers: {
    setOpenMenuAccount(state, action) {
      const { platformName, accountName } = action.payload;
      state.openMenuAccount = { platformName, accountName };
    },
  },
});

const accountIntegrationActions = accontIntegrationSlice.actions;
const accountIntegrationReducer = accontIntegrationSlice.reducer;

export { accountIntegrationActions, accountIntegrationReducer };
