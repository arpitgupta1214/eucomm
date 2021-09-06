import Filters from "components/Filters";
import InlineFilters from "components/InlineFilters";
import { FilterLayout } from "components/Layouts";
import ResultCard from "components/ResultCards/ResultCard";
import Sort from "components/Sort";
import produce from "immer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Whitepapers = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/whitepages/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
    };
    getResults();
    console.log("updated");
  }, [sortBy, activeFilters, dispatch]);

  return (
    <>
      {results.map((result, idx) => (
        <ResultCard key={`result-${idx}`} result={result} />
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  const filtersData = await import(
    "data/resources/whitepages/filters.json"
  ).then((data) => data.default);

  const sortOptions = await import(
    "data/resources/whitepages/sortOptions.json"
  ).then((data) => data.default);
  return {
    props: {
      heading: "Whitepapers",
      subHeading:
        "Find out more about sales and channel enablement best practices and industry trends here",
      filtersData,
      sortOptions,
    },
  };
};

Whitepapers.layout = FilterLayout;
export default Whitepapers;
