import { FilterLayout } from "components/Layouts";
import PressReleaseResult from "components/Results/PressReleaseResult";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const PressReleases = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/pressReleases/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
    };
    getResults();
  }, [sortBy, activeFilters, dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
      {results.map((result, idx) => (
        <PressReleaseResult key={`result-${idx}`} result={result} />
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import(
    "data/resources/pressReleases/data.json"
  ).then((data) => data.default);
  return {
    props: {
      ...staticData,
    },
  };
};

PressReleases.layout = FilterLayout;
export default PressReleases;
