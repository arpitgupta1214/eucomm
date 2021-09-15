import { FilterLayout } from "components/Layouts";
import ChannelResult from "components/Results/ChannelResult";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Channels = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const searchString = useSelector((state) => state.search.searchString);
  const results = useSelector((state) => state.search.results);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/channels/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
      setLoading(false);
    };
    getResults();
  }, [sortBy, searchString, dispatch]);
  if (loading) {
    return <></>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {results.map((result, idx) => (
        <ChannelResult key={`result-${idx}`} result={result} />
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/resources/channels/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

Channels.layout = FilterLayout;
export default Channels;
