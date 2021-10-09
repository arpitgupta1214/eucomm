import CustomIcon from "components/CustomIcon";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const searchString = useSelector((state) => state.search.searchString);

  const onChange = (event) => {
    dispatch(searchActions.setSearchString(event.target.value));
  };

  return (
    <div className="w-full text-sm bg-skin-light py-1 px-3 flex items-center">
      <span className="my-1 text-skin-light text-xl">
        <CustomIcon name="FiSearch" />
      </span>
      <input
        type="text"
        className="ml-2 bg-skin-light outline-none"
        placeholder="Search..."
        value={searchString}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
