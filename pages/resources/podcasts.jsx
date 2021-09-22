import { FilterLayout } from "components/Layouts";
import PodcastResult from "components/Results/PodcastResult";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";
import { Player } from "components/ui";

const Podcasts = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const results = useSelector((state) => state.search.results);

  const playingPodcastId = useSelector(
    (state) => state.podcast.playingPodcastId
  );

  const currentResult = results.find(
    (result) => result.id === playingPodcastId
  );

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getResults = async () => {
      const resultsData = await import(
        "data/resources/podcasts/results.json"
      ).then((data) => data.default);
      dispatch(searchActions.setResults({ results: resultsData }));
      setLoading(false);
    };
    getResults();
  }, [sortBy, dispatch]);

  const toggleLike = ({ podcastId }) => {
    const newResults = results.map((result) => {
      if (result.id === podcastId) {
        return { ...result, liked: !result.liked };
      } else {
        return result;
      }
    });
    dispatch(searchActions.setResults({ results: newResults }));
  };

  if (loading) {
    return <></>;
  }
  return (
    <>
      <div className="pb-24">
        {results.map((result, idx) => (
          <PodcastResult
            key={`result-${idx}`}
            result={result}
            toggleLike={toggleLike}
          />
        ))}
      </div>
      {currentResult && <Player />}
    </>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/resources/podcasts/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

Podcasts.layout = FilterLayout;
export default Podcasts;
