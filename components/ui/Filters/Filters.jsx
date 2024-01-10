import s from "./filters.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";
import CustomIcon from "components/CustomIcon";

const Filters = ({ filters }) => {
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const customDate = useSelector((state) => state.search.customDate);
  const openFilterPanels = useSelector(
    (state) => state.search.openFilterPanels
  );

  const dispatch = useDispatch();
  const toggleFilter = ({ filterName }) => {
    dispatch(searchActions.toggleFilterPanel({ filterName }));
  };

  const toggleOption = ({ optionName, filterName }) => {
    dispatch(searchActions.toggleOption({ optionName, filterName }));
  };
  return (
    <div className={s.filters}>
      <span className={s.head}>Filter by</span>
      {filters.map((filter) => {
        const panelOpen = openFilterPanels.find(
          (filterPanel) => filterPanel.name === filter.name
        );
        return (
          <div key={`${filter.name}-filter`} className={s.filter}>
            <div className={s.filterName}>
              <span>{filter.name}</span>
              <button onClick={() => toggleFilter({ filterName: filter.name })}>
                {panelOpen ? (
                  <CustomIcon name="FaMinus" />
                ) : (
                  <CustomIcon name="FaPlus" />
                )}{" "}
              </button>
            </div>
            <AnimatePresence>
              {panelOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className={s.filterOptions}
                >
                  {filter.options.map((option) => {
                    const optionSelected = activeFilters.find(
                      (activeFilter) =>
                        activeFilter.filterName === filter.name &&
                        activeFilter.optionName === option.name
                    );

                    return (
                      <div key={`${filter.name}-${option.name}-option`}>
                        <div
                          className={`${s.filterOption} ${
                            optionSelected ? s.selected : ""
                          }`}
                        >
                          <span>{option.name}</span>
                          <Checkbox
                            onChange={() =>
                              toggleOption({
                                optionName: option.name,
                                filterName: filter.name,
                              })
                            }
                            checked={optionSelected}
                          />
                        </div>
                        {filter.name === "Date" &&
                          option.name === "Custom" &&
                          optionSelected &&
                          customDate.from &&
                          customDate.to && (
                            <button
                              className="text-skin-highlight font-base self-start"
                              onClick={() => {
                                dispatch(
                                  searchActions.setCustomDate({
                                    customDate: {},
                                  })
                                );
                              }}
                            >
                              Edit Date
                            </button>
                          )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
