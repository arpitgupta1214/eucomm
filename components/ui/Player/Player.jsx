import { useEffect, useState } from "react";
import { AiOutlinePause } from "react-icons/ai";
import { FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { RiVolumeDownFill, RiVolumeMuteFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import formatSeconds from "util/formatSeconds";
import { Howler } from "howler";
import { podcastActions } from "store/podcastSlice";

const Player = () => {
  const dispatch = useDispatch();
  const currentPlaytime = useSelector((state) => state.podcast.currentPlaytime);
  const currentTotalTime = useSelector(
    (state) => state.podcast.currentTotalTime
  );
  const isMobile = useSelector((state) => state.ui.isMobile);
  const results = useSelector((state) => state.search.results);
  const playing = useSelector((state) => state.podcast.playing);
  const playingPodcastId = useSelector(
    (state) => state.podcast.playingPodcastId
  );

  const currentResult = results.find(
    (result) => result.id === playingPodcastId
  );
  const seekerValue = parseInt((currentPlaytime / currentTotalTime) * 100);

  const togglePlay = () => {
    dispatch(podcastActions.setPlaying({ playing: !playing }));
  };
  const pause = () => {
    dispatch(podcastActions.setPlaying({ playing: false }));
  };
  const play = () => {
    dispatch(podcastActions.setPlaying({ playing: true }));
  };
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    Howler.volume(volume);
  }, [volume]);

  const onScrub = (e) => {
    dispatch(
      podcastActions.setCurrentPlaytime({
        playtime: parseInt((e.target.value * currentTotalTime) / 100),
      })
    );
    console.log(parseInt((e.target.value * currentTotalTime) / 100));
  };

  const [initialState, setInitialState] = useState("playing");
  const startScrub = () => {
    setInitialState(playing ? "playing" : "paused");
    pause();
  };
  const endScrub = () => {
    initialState === "playing" && play();
  };
  return (
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
            onChange={onScrub}
            onMouseDown={startScrub}
            onTouchStart={startScrub}
            onMouseUp={endScrub}
            onTouchEnd={endScrub}
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
  );
};

export default Player;
