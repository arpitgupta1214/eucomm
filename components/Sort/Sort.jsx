import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const Sort = ({ sortOptions }) => {
  const sortBy = useSelector((state) => state.search.sortBy);
  const setSortBy = ({ sortBy }) => {
    dispatch(searchActions.setSortBy({ sortBy }));
  };

  const [showOptions, setShowOptions] = useState(false);
  const toggleShowOptions = () => {
    setShowOptions((showOptions) => !showOptions);
  };
  const selectSortOption = (sortOption) => {
    setSortBy(sortOption);
    toggleShowOptions();
  };
  return (
    <div className="text-sm bg-skin-light py-1 px-3 ml-3 relative flex items-center">
      <span className="text-skin-light whitespace-nowrap">Sort by:</span>
      <span className="ml-1 text-skin-base capitalize">{sortBy}</span>
      <button
        className="ml-1 pb-1 text-skin-highlight text-2xl"
        onClick={toggleShowOptions}
      >
        {showOptions ? <BiChevronUp /> : <BiChevronDown />}
      </button>

      {/* sort options */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute w-full top-full left-0 z-50 bg-skin-base border border-skin-base overflow-hidden"
          >
            {sortOptions
              .filter((sortOption) => sortBy !== sortOption)
              .map((sortOption) => (
                <button
                  key={`sortOption-${sortOption}`}
                  onClick={() => selectSortOption(sortOption)}
                  className="w-full p-1 text-center text-skin-light hover:text-skin-base"
                >
                  {sortOption}
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sort;
