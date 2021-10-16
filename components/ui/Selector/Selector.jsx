import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Selector = ({ options }) => {
  const active = useSelector((state) => state.search.tab);
  const dispatch = useDispatch();
  const onSelect = ({ option }) =>
    dispatch(searchActions.setTab({ tab: option }));
  return (
    <div className="bg-skin-light rounded-full p-0.5 flex">
      {options.map((option, idx) => (
        <button
          key={`option-${idx}`}
          className={`py-2 px-3 rounded-full text-sm ${
            active === option
              ? "text-skin-base bg-skin-base"
              : "text-skin-highlight bg-none"
          }`}
          onClick={() => onSelect({ option })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Selector;
