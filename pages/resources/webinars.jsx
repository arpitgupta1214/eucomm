import { FilterLayout } from "components/Layouts";
import WebinarResult from "components/Results/WebinarResult";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Webinars = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const activeTab = useSelector((state) => state.search.tab);
  const results = useSelector((state) => state.search.results);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/webinars/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
      setLoading(false);
    };
    getResults();
  }, [sortBy, activeFilters, activeTab, dispatch]);
  if (loading) {
    return <></>;
  }
  return results.map((result, idx) => (
    <WebinarResult key={`result-${idx}`} result={result} />
  ));
};

export const getStaticProps = async () => {
  const staticData = await import("data/resources/webinars/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

Webinars.layout = FilterLayout;
export default Webinars;
