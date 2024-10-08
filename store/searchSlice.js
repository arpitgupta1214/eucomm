import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilters: [],
  openFilterPanels: [],
  searchString: "",
  sortBy: null,
  results: [],
  tab: null,
  customDate: {},
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    toggleOption(state, action) {
      const { optionName, filterName } = action.payload;

      const existing = state.activeFilters.find(
        (filter) =>
          filter.filterName === filterName && filter.optionName === optionName
      );
      if (existing) {
        state.activeFilters = state.activeFilters.filter(
          (filter) =>
            !(
              filter.filterName === filterName &&
              filter.optionName === optionName
            )
        );
      } else {
        state.activeFilters.push({ optionName, filterName });
      }
    },
    toggleFilterPanel(state, action) {
      const { filterName } = action.payload;

      const existing = state.openFilterPanels.find(
        (filterPanel) => filterPanel.name === filterName
      );
      if (existing) {
        state.openFilterPanels = state.openFilterPanels.filter(
          (filterPanel) => !(filterPanel.name === filterName)
        );
      } else {
        state.openFilterPanels.push({ name: filterName });
      }
    },
    setSearchString(state, action) {
      const { searchString } = action.payload;
      state.searchString = searchString;
    },
    setSortBy(state, action) {
      const { sortBy } = action.payload;
      state.sortBy = sortBy;
    },
    setResults(state, action) {
      const { results } = action.payload;
      state.results = results || [];
      state.loading = false;
    },
    setTab(state, action) {
      const { tab } = action.payload;
      state.tab = tab;
    },
    setCustomDate(state, action) {
      const { customDate } = action.payload;
      state.customDate = customDate;
    },
  },
});

const searchActions = searchSlice.actions;
const searchReducer = searchSlice.reducer;

export { searchActions, searchReducer };
