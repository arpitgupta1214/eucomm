import { FilterLayout } from "components/Layouts";
import DocumentLibraryResult from "components/Results/DocumentLibraryResult";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const DocumentLibrary = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const searchString = useSelector((state) => state.search.searchString);
  const results = useSelector((state) => state.search.results);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/documentLibrary/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
      setLoading(false);
    };
    getResults();
  }, [sortBy, activeFilters, searchString, dispatch]);
  if (loading) {
    return <></>;
  }
  return results.map((result, idx) => (
    <DocumentLibraryResult key={`result-${idx}`} result={result} />
  ));
};

export const getStaticProps = async () => {
  const staticData = await import(
    "data/resources/documentLibrary/data.json"
  ).then((data) => data.default);
  return {
    props: {
      ...staticData,
    },
  };
};

DocumentLibrary.layout = FilterLayout;
export default DocumentLibrary;
