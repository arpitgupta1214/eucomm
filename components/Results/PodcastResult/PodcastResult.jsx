import { useDispatch } from "react-redux";
import { podcastActions } from "store/podcastSlice";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import theme from "themeConfig.json";
import formatSeconds from "util/formatSeconds";
import CustomIcon from "components/CustomIcon";

const processAudioData = (audioBuffer) => {
  const rawData = audioBuffer.getChannelData(0);
  const samples = 70;
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]);
    }
    filteredData.push(sum / blockSize);
  }
  const maxPoint = Math.max(...filteredData);
  const normalData = filteredData.map((point) => point / maxPoint);
  return normalData;
};

const visualize = ({
  visualisationData,
  canvas,
  currentPlaytime,
  currentTotalTime,
  playing,
}) => {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.translate(0, canvas.offsetHeight / 2);

  const width = canvas.offsetWidth / visualisationData.length;

  const currentBarIdx =
    playing &&
    parseInt((currentPlaytime / currentTotalTime) * visualisationData.length);

  for (let i = 0; i < visualisationData.length; i++) {
    const x = width * i;
    const y = visualisationData[i] * canvas.offsetHeight;
    ctx.lineWidth = i === currentBarIdx ? 2 : 1;
    ctx.strokeStyle =
      i <= currentBarIdx ? theme.colorHighlight : theme.textColorExtraLight;
    ctx.beginPath();
    ctx.moveTo(x, -(y / 2));
    ctx.lineTo(x, y / 2);
    ctx.stroke();
  }
};

const PodcastResult = ({ result, toggleLike }) => {
  const dispatch = useDispatch();
  const playingPodcastId = useSelector(
    (state) => state.podcast.playingPodcastId
  );

  const playing = useSelector((state) => state.podcast.playing);

  const currentPlaytime = useSelector((state) => state.podcast.currentPlaytime);
  const currentTotalTime = useSelector(
    (state) => state.podcast.currentTotalTime
  );

  const [totalTime, setTotalTime] = useState(null);
  const [visualisationData, setVisulisationData] = useState(null);
  useEffect(() => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    fetch(result.audio)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        setTotalTime(audioBuffer.duration);
        const visualisationData = processAudioData(audioBuffer);
        setVisulisationData(visualisationData);
      });
  }, [result.audio]);

  const [audioSource, setAudioSource] = useState(null);
  const togglePlay = ({ podcastId }) => {
    if (playingPodcastId === result.id) {
      dispatch(podcastActions.setPlaying({ playing: !playing }));
    } else {
      const source = new Howl({ src: result.audio, html5: true });
      setAudioSource(source);
      const onLoad = () => {
        dispatch(podcastActions.setCurrentPlaytime({ playtime: 0 }));
        dispatch(
          podcastActions.setCurrentTotalTime({
            totalTime: parseInt(source.duration()),
          })
        );
        dispatch(podcastActions.setPlayingPodcastId({ podcastId }));
        dispatch(podcastActions.setPlaying({ playing: true }));
      };

      if (source.state() === "loaded") {
        onLoad();
      } else {
        source.on("load", onLoad);
      }
    }
  };

  useEffect(() => {
    if (playingPodcastId === result.id) {
      if (playing) {
        audioSource.play();
        const intervalId = setInterval(() => {
          dispatch(
            podcastActions.setCurrentPlaytime({
              playtime: parseInt(audioSource.seek()),
            })
          );
        }, 1000);
        return () => {
          clearInterval(intervalId);
        };
      } else {
        audioSource.pause();
      }
    } else {
      audioSource?.stop();
    }
  }, [playingPodcastId, playing, audioSource, dispatch, result.id]);

  useEffect(() => {
    if (playingPodcastId === result.id) {
      if (Math.abs(parseInt(audioSource.seek()) - currentPlaytime) > 5)
        audioSource.seek(currentPlaytime);
    }
  }, [playingPodcastId, audioSource, currentPlaytime, result.id]);

  const graphCanvasRef = useRef();

  useEffect(() => {
    if (visualisationData && playingPodcastId !== result.id) {
      visualize({
        visualisationData,
        canvas: graphCanvasRef.current,
        playing: false,
      });
    }
  }, [visualisationData, playingPodcastId, result.id]);
  useEffect(() => {
    if (visualisationData && playingPodcastId === result.id) {
      visualize({
        visualisationData,
        canvas: graphCanvasRef.current,
        playing: true,
        currentPlaytime,
        currentTotalTime,
      });
    }
  }, [
    visualisationData,
    playingPodcastId,
    currentPlaytime,
    currentTotalTime,
    result.id,
  ]);

  return (
    <div className="flex flex-wrap items-center md:items-start px-5 pt-5 md:p-6 md:pb-3 bg-skin-light mb-8">
      {/* description */}
      <div className="w-full flex flex-col max-w-md mb-2 md:mb-4 md:order-2">
        <h3 className="text-xs text-skin-extra-light">{result.date}</h3>
        <h1 className="font-bold text-lg md:text-xl mt-2">{result.head}</h1>
        <h2 className="text-skin-light text-sm md:text-base mt-1">
          {result.subhead}
        </h2>
      </div>

      {/* play button */}
      <button
        className={`w-10 h-10 md:w-14 md:h-14 p-2 mr-4 rounded-full overflow-hidden flex justify-center items-center bg-skin-highlight outline-none ${
          playingPodcastId === result.id && playing ? " bg-opacity-10" : ""
        } md:order-1`}
        onClick={() => togglePlay({ podcastId: result.id })}
      >
        {playingPodcastId === result.id && playing ? (
          <CustomIcon
            name="AiOutlinePause"
            className="w-full h-full text-skin-highlight"
          />
        ) : (
          <CustomIcon name="FaPlay" className="w-1/2 h-1/2 text-white" />
        )}
      </button>
      {/* visualisation */}
      <div className="w-10/12 ml-auto h-7 md:h-10 md:w-full md:order-4">
        {visualisationData && (
          <canvas className="h-full w-full" ref={graphCanvasRef} />
        )}
      </div>
      {/* time */}
      <div className="w-full pl-16 md:pl-0 mt-2 flex text-xs text-skin-light md:order-5">
        {playingPodcastId === result.id && (
          <span>{formatSeconds(currentPlaytime)}</span>
        )}
        <span className="ml-auto">{formatSeconds(totalTime)}</span>
      </div>
      {/* download like */}
      <div className="w-full md:w-auto flex justify-evenly mt-3 md:mt-0 md:ml-auto p-3 md:p-0 border-t border-skin-base md:border-none md:order-3">
        <button className="w-6 h-6 text-skin-extra-light mr-4">
          <CustomIcon name="BiUpload" className="h-full w-full" />
        </button>
        <button
          className="w-6 h-6"
          onClick={() => {
            toggleLike({ podcastId: result.id });
          }}
        >
          {result.liked ? (
            <CustomIcon
              name="AiFillHeart"
              className="w-full h-full text-red-600"
            />
          ) : (
            <CustomIcon
              name="AiOutlineHeart"
              className="w-full h-full text-skin-extra-light"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default PodcastResult;
