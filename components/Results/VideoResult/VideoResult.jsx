import { HiPlay } from "react-icons/hi";

const VideoResult = ({ result }) => {
  return (
    <div className="relative" style={{ paddingTop: "56%" }}>
      {/* image */}
      <div
        className="absolute top-0 lef-0 w-full h-full bg-center bg-cover filter brightness-50"
        style={{ zIndex: -1, backgroundImage: `url(${result.img})` }}
      />
      {/* heading  */}
      <div className="w-full flex items-center absolute top-4 left-0 px-3">
        <div className="w-10 h-10 mr-3 flex-shrink-0 rounded-full overflow-hidden flex justify-center items-center">
          <img className="w-full" src={result.thumbImg} alt="" />
        </div>

        <div className="flex-grow flex flex-col min-w-0">
          <span className="w-full whitespace-nowrap overflow-hidden overflow-ellipsis font-bold text-sm text-white mb-2">
            {result.head}
          </span>
          <span className="text-xs text-skin-gray">{result.date}</span>
        </div>
      </div>
      {/* play button */}
      <button className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
        <HiPlay className="text-white w-full h-full" />
      </button>
    </div>
  );
};

export default VideoResult;
