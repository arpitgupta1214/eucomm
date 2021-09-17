import { FilterLayout } from "components/Layouts";
import PodcastResult from "components/Results/PodcastResult";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";
import { FaStepBackward, FaStepForward, FaPlay } from "react-icons/fa";
import { AiOutlinePause } from "react-icons/ai";
import { podcastActions } from "store/podcastSlice";
import { RiVolumeMuteFill, RiVolumeDownFill } from "react-icons/ri";
import formatSeconds from "util/formatSeconds";
import { Howler } from "howler";

const Podcasts = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const results = useSelector((state) => state.search.results);
  const playing = useSelector((state) => state.podcast.playing);
  const isMobile = useSelector((state) => state.ui.isMobile);
  const playingPodcastId = useSelector(
    (state) => state.podcast.playingPodcastId
  );
  const currentPlaytime = useSelector((state) => state.podcast.currentPlaytime);
  const currentTotalTime = useSelector(
    (state) => state.podcast.currentTotalTime
  );

  const currentResult = results.find(
    (result) => result.id === playingPodcastId
  );
  const seekerValue = parseInt((currentPlaytime / currentTotalTime) * 100);
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

  const togglePlay = () => {
    dispatch(podcastActions.setPlaying({ playing: !playing }));
  };

  const [volume, setVolume] = useState(1);

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

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
      {currentResult && (
        <div className="w-screen fixed bottom-0 left-0 p-4 bg-skin-dark flex text-white">
          <div
            className="w-full mx-auto flex items-center"
            style={{ maxWidth: "1200px" }}
          >
            {/* seeker */}
            <div className="flex-grow flex flex-col min-w-0">
              <div className="text-sm mb-2 whitespace-nowrap overflow-hidden overflow-ellipsis md:whitespace-normal">
                {currentResult.head}
              </div>
              <input
                className="w-full"
                type="range"
                min="0"
                max="100"
                value={seekerValue}
                readOnly
              />

              {/* times  */}
              <div className="text-xs flex justify-between">
                <span>{formatSeconds(currentPlaytime)}</span>
                <span>{formatSeconds(currentTotalTime)}</span>
              </div>
            </div>
            {/* controls */}
            <div className="flex items-center md:mr-8">
              {!isMobile && (
                <button className="w-4 h-4">
                  <FaStepBackward className="w-full h-full" />
                </button>
              )}
              <button
                className={`w-8 h-8 p-2 mx-4 rounded-full overflow-hidden flex justify-center items-center bg-skin-base bg-opacity-10`}
                onClick={() => togglePlay()}
              >
                {playing ? (
                  <AiOutlinePause className="w-full h-full" />
                ) : (
                  <FaPlay className="w-1/2 h-1/2 " />
                )}
              </button>
              <button className="w-4 h-4">
                <FaStepForward className="w-full h-full" />
              </button>
            </div>

            {/* mute  */}
            {!isMobile && (
              <button
                className="ml-8 h-4 w-4"
                onClick={() => {
                  setVolume((volume) => {
                    if (volume) {
                      return 0;
                    } else {
                      return 1;
                    }
                  });
                }}
              >
                {volume ? (
                  <RiVolumeDownFill className="h-full w-full" />
                ) : (
                  <RiVolumeMuteFill className="h-full w-full" />
                )}
              </button>
            )}
          </div>
        </div>
      )}
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
