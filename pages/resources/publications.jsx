import { FilterLayout } from "components/Layouts";
import PublicationResult from "components/Results/PublicationResult";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Publications = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/publications/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
    };
    getResults();
  }, [sortBy, activeFilters, dispatch]);

  return (
    <>
      {results.map((result, idx) => (
        <PublicationResult key={`result-${idx}`} result={result} />
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/resources/publications/data.json").then(
    (data) => data.default
  );
  return {
    props: {
      ...staticData,
    },
  };
};

Publications.layout = FilterLayout;
export default Publications;
