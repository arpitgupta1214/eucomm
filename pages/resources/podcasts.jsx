import { FilterLayout } from "components/Layouts";
import PodcastResult from "components/Results/PodcastResult";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";
import { FaStepBackward, FaStepForward, FaPlay } from "react-icons/fa";
import { AiOutlinePause } from "react-icons/ai";
import { podcastActions } from "store/podcastSlice";
import { RiVolumeMuteFill, RiVolumeDownFill } from "react-icons/ri";
import { Howler } from "howler";
const padNumber = (number) => `00${number}`.slice(-2);

const Podcasts = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.sortBy);
  const results = useSelector((state) => state.search.results);
  const playing = useSelector((state) => state.podcast.playing);
  const playingPodcastId = useSelector(
    (state) => state.podcast.playingPodcastId
  );
  const currentPlaytime = useSelector((state) => state.podcast.currentPlaytime);
  const playMinutes = parseInt(currentPlaytime / 60);
  const playSeconds = currentPlaytime - playMinutes * 60;

  const currentTotalTime = useSelector(
    (state) => state.podcast.currentTotalTime
  );
  const totalMinutes = parseInt(currentTotalTime / 60);
  const totalSeconds = currentTotalTime - totalMinutes * 60;

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
            {/* controls */}
            <div className="flex items-center mr-8">
              <button className="w-4 h-4">
                <FaStepBackward className="w-full h-full" />
              </button>

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

            {/* seeker */}
            <div className="flex-grow flex flex-col">
              <div className="text-sm mb-2">{currentResult.head}</div>
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
                <span>{`${padNumber(playMinutes)}:${padNumber(
                  playSeconds
                )}`}</span>

                <span>{`${padNumber(totalMinutes)}:${padNumber(
                  totalSeconds
                )}`}</span>
              </div>
            </div>

            {/* mute  */}
            <button
              className="ml-8 h-4 w-4"
              onClick={() => {
                console.log(volume);
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
