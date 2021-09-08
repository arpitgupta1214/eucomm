import { FilterLayout } from "components/Layouts";
import VideoResult from "components/Results/VideoResult";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Videos = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const activeTab = useSelector((state) => state.search.tab);
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    console.log("updates");
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/videos/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
    };
    getResults();
  }, [sortBy, activeFilters, activeTab, dispatch]);

  return (
    <div className="grid grid-cols-2 gap-8">
      {results.map((result, idx) => (
        <VideoResult key={`result-${idx}`} result={result} />
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const filtersData = await import("data/resources/videos/filters.json").then(
    (data) => data.default
  );

  const sortOptions = await import(
    "data/resources/videos/sortOptions.json"
  ).then((data) => data.default);

  return {
    props: {
      heading: "Videos",
      subHeading:
        "Watch our videos to learn more about EU COMM as a platform, as a company and as a thought process",
      filtersData,
      sortOptions,
    },
  };
};

Videos.layout = FilterLayout;
export default Videos;
