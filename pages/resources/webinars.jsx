import { FilterLayout } from "components/Layouts";
import WebinarResult from "components/WebinarResult";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Webinars = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const activeTab = useSelector((state) => state.search.tab);
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    console.log("updates");
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/webinars/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
    };
    getResults();
  }, [sortBy, activeFilters, activeTab, dispatch]);

  return (
    <>
      {results.map((result, idx) => (
        <WebinarResult key={`result-${idx}`} result={result} />
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  const filtersData = await import("data/resources/webinars/filters.json").then(
    (data) => data.default
  );

  const sortOptions = await import(
    "data/resources/webinars/sortOptions.json"
  ).then((data) => data.default);

  const tabs = await import("data/resources/webinars/tabs.json").then(
    (data) => data.default
  );
  return {
    props: {
      heading: "Webinars",
      subHeading:
        "Thought leadership webinars on PRM, channel marketing, partner enablement, marketing automation, sales enablement and more!",
      filtersData,
      sortOptions,
      tabs,
    },
  };
};

Webinars.layout = FilterLayout;
export default Webinars;
