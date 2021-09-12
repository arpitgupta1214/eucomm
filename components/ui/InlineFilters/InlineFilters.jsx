import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";
const InlineFilters = () => {
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const resultsCount = useSelector((state) => state.search.results.length);
  const dispatch = useDispatch();
  const toggleOption = ({ optionName, filterName }) => {
    dispatch(searchActions.toggleOption({ optionName, filterName }));
  };
  const clearAll = () => {
    activeFilters.forEach((activeFilter) => toggleOption(activeFilter));
  };
  return (
    <div className="w-full flex items-baseline text-sm text-skin-light">
      <span className="whitespace-nowrap">Found {resultsCount} results</span>
      {/* inline filters */}
      <div className="flex flex-wrap">
        {activeFilters.map((activeFilter) => (
          <div
            key={`inline-filter-${activeFilter.optionName}-${activeFilter.filterName}`}
            className="px-3 py-1 mx-3 my-1 border border-skin-base flex items-center"
          >
            <span>{activeFilter.filterName}:</span>
            <span className="text-skin-base ml-1">
              {activeFilter.optionName}
            </span>
            <button
              className="text-red-600 ml-1 pb-1 text-2xl"
              onClick={() => toggleOption(activeFilter)}
            >
              <IoIosClose />
            </button>
          </div>
        ))}
      </div>
      {/* clear all  */}
      {activeFilters.length > 0 && (
        <button
          className="whitespace-nowrap text-skin-highlight"
          onClick={clearAll}
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default InlineFilters;
