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
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/videos/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
    };
    getResults();
  }, [sortBy, activeFilters, activeTab, dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      {results.map((result, idx) => (
        <VideoResult key={`result-${idx}`} result={result} />
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/resources/videos/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

Videos.layout = FilterLayout;
export default Videos;
