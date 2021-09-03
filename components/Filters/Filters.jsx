import s from "./filters.module.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Filters = ({ filters, toggleFilter, toggleOption }) => {
  return (
    <div className={s.filters}>
      <span className={s.head}>Filter by</span>
      {filters.map((filter) => (
        <div key={`${filter.name}-filter`} className={s.filter}>
          <div className={s.filterName}>
            <span>{filter.name}</span>
            <button onClick={() => toggleFilter(filter.name)}>
              {filter.open ? <FaMinus /> : <FaPlus />}{" "}
            </button>
          </div>
          <AnimatePresence>
            {filter.open && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className={s.filterOptions}
              >
                {filter.options.map((option) => (
                  <div
                    key={`${filter.name}-${option.name}-option`}
                    className={`${s.filterOption} ${
                      option.selected ? s.selected : ""
                    }`}
                  >
                    <span>{option.name}</span>
                    <input
                      type="checkbox"
                      onChange={() => toggleOption(filter.name, option.name)}
                      checked={option.selected}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Filters;
