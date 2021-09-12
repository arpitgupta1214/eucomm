import Layout from "components/Layouts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchActions } from "store/searchSlice";
import ConnectedAccountResult from "components/Results/ConnectedAccountResult";
const ConnectedAccounts = (props) => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    const getResults = async () => {
      const resultsData = await import(
        "data/connectedAccounts/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
    };
    getResults();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center mt-12 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{props.head}</h1>
      {results.map((result, idx) => (
        <ConnectedAccountResult key={`result-${idx}`} result={result} />
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/connectedAccounts/data.json").then(
    (data) => data.default
  );
  return { props: { ...staticData } };
};

ConnectedAccounts.layout = Layout;
export default ConnectedAccounts;
