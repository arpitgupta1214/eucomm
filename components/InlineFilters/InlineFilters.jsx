import { IoIosClose } from "react-icons/io";
const InlineFilters = ({ filters, toggleOption, resultsCount }) => {
  const selectedFilters = filters.reduce(
    (selectedFilters, filter) => [
      ...selectedFilters,
      ...filter.options
        .filter((option) => option.selected)
        .map((option) => ({ name: option.name, filterName: filter.name })),
    ],
    []
  );
  const clearAll = () => {
    selectedFilters.forEach((selectedFilter) =>
      toggleOption(selectedFilter.filterName, selectedFilter.name)
    );
  };
  return (
    <div className="w-full flex items-baseline text-sm text-skin-light">
      <span className="whitespace-nowrap">Found {resultsCount} results</span>
      {/* inline filters */}
      <div className="flex flex-wrap">
        {selectedFilters.map((selectedFilter) => (
          <div
            key={`inline-filter-${selectedFilter.name}-${selectedFilter.filterName}`}
            className="px-3 py-1 mx-3 my-1 border border-skin-base flex items-center"
          >
            <span>{selectedFilter.filterName}:</span>
            <span className="text-skin-base ml-1">{selectedFilter.name}</span>
            <button
              className="text-red-600 ml-1 pb-1 text-2xl"
              onClick={() =>
                toggleOption(selectedFilter.filterName, selectedFilter.name)
              }
            >
              <IoIosClose />
            </button>
          </div>
        ))}
      </div>
      {/* clear all  */}
      {selectedFilters.length > 0 && (
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
