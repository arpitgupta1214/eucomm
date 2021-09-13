import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: true,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setIsMobile(state, action) {
      const { isMobile } = action.payload;
      state.isMobile = isMobile;
    },
  },
});

const uiActions = uiSlice.actions;
const uiReducer = uiSlice.reducer;

export { uiActions, uiReducer };
