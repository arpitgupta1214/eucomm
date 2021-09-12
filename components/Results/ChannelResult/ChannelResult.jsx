import Image from "next/image";
import { BsArrowRight, BsThreeDotsVertical } from "react-icons/bs";

const ChannelResult = ({ result }) => {
  return (
    <div className="flex items-start border border-skin-base hover:bg-skin-light">
      {/* img  */}
      <div
        className="pt-6 pl-6 mr-5 flex-shrink-0 border-t-2"
        style={{ borderColor: result.baseColor }}
      >
        <div className="w-12 h-12">
          <Image src={result.img} alt="" height="50" width="50" />
        </div>
      </div>

      {/* content */}
      <div className={`my-6 mr-3 ml-0 relative`}>
        <h1 className="w-3/5 text-xl font-bold mb-1">{result.head}</h1>
        <h2 className="text-skin-light mb-1">{result.subhead}</h2>
        <button className="flex items-center text-skin-highlight">
          <span className="font-medium">Explore Now</span>
          <BsArrowRight className="ml-2 pb-1 text-2xl" />
        </button>

        {/* options */}
        <button className="w-6 h-6 absolute top-0 right-0 text-skin-extra-light">
          <BsThreeDotsVertical className="w-full h-full" />
        </button>
      </div>
    </div>
  );
};

export default ChannelResult;
