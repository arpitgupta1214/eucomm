import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Tabs = ({ tabs }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.tab);
  const setTab = ({ tab }) => {
    dispatch(searchActions.setTab({ tab }));
  };
  return (
    <div className="flex mb-8 border-b border-skin-base">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={`tab-${tab}`}
            className={`mr-8 py-3 text-lg ${
              isActive
                ? "font-bold border-b-2 border-black"
                : "text-skin-highlight"
            }`}
            onClick={() => {
              setTab({ tab });
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
