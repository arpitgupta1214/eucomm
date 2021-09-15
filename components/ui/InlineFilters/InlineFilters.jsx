import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";
const InlineFilters = ({ openFilters }) => {
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const resultsCount = useSelector((state) => state.search.results.length);
  const isMobile = useSelector((state) => state.ui.isMobile);
  const dispatch = useDispatch();
  const toggleOption = ({ optionName, filterName }) => {
    dispatch(searchActions.toggleOption({ optionName, filterName }));
  };
  const clearAll = () => {
    activeFilters.forEach((activeFilter) => toggleOption(activeFilter));
  };
  return (
    <div className="w-full flex text-sm text-skin-light">
      <span className="whitespace-nowrap mr-3 md:mr-0 md:mt-2">
        Found {resultsCount} results
      </span>
      <div className="flex-grow md:flex-grow-0 md:pl-3 flex items-start md:flex-row-reverse overflow-hidden">
        {/* clear all  */}
        {activeFilters.length > 0 ? (
          <button
            className="whitespace-nowrap text-skin-highlight mt-1 md:mt-2 pl-3 md:pl-0 border-l border-skin-base md:border-none mr-2"
            onClick={clearAll}
          >
            Clear all
          </button>
        ) : (
          isMobile && (
            <button
              className="whitespace-nowrap text-skin-highlight pl-3 border-l border-skin-base md:border-none mr-2"
              onClick={openFilters}
            >
              Filters
            </button>
          )
        )}
        {/* inline filters */}
        <div className="flex md:flex-wrap flex-grow-0 overflow-x-auto">
          {activeFilters.map((activeFilter) => (
            <div
              key={`inline-filter-${activeFilter.optionName}-${activeFilter.filterName}`}
              className="px-3 py-1 mr-3 mb-1 border border-skin-base flex items-center"
              onClick={openFilters}
            >
              <span>{activeFilter.filterName}:</span>
              <span className="text-skin-base ml-1 whitespace-nowrap">
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
      </div>
    </div>
  );
};

export default InlineFilters;
