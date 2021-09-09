import { FilterLayout } from "components/Layouts";
import DocumentLibraryResult from "components/Results/DocumentLibraryResult";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const DocumentLibrary = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/documentLibrary/results.json"
      ).then((data) => data.default);
      console.log(resultsData);
      dispatch(searchActions.setResults({ results: resultsData }));
    };
    getResults();
    console.log("updated");
  }, [sortBy, activeFilters, dispatch]);

  return (
    <>
      {results.map((result, idx) => (
        <DocumentLibraryResult key={`result-${idx}`} result={result} />
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  const staticData = await import(
    "data/resources/document-library/data.json"
  ).then((data) => data.default);

  return {
    props: {
      ...staticData,
    },
  };
};

DocumentLibrary.layout = FilterLayout;
export default DocumentLibrary;
