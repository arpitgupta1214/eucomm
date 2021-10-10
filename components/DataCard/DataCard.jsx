import CustomIcon from "components/CustomIcon";
import Image from "next/image";
import router from "next/router";

const DataCard = ({ datum, downloadAsText, interactiveText, light }) => (
  <div className="w-full">
    <Image
      src={datum.image.src}
      alt=""
      width={datum.image.width}
      height={datum.image.height}
      layout="responsive"
      priority={true}
    />
    {/* content */}
    <div
      className={`w-full py-5 px-6  ${
        light ? "bg-skin-light" : "bg-skin-base"
      }`}
    >
      <div className="mb-1 font-bold text-xl">{datum.name}</div>
      <div className="mb-3 flex">
        <CustomIcon
          name="BiDownload"
          className="mr-2 text-skin-highlight text-xl"
        />
        <div className="text-skin-light">
          {downloadAsText}{" "}
          <button className="text-skin-highlight underline">
            {datum.fileType}
          </button>
        </div>
      </div>
      <div className="flex">
        <CustomIcon
          name="FiPlayCircle"
          className="mr-2 text-skin-highlight text-xl"
        />
        <button
          className="text-skin-highlight underline"
          onClick={() =>
            router.push(`${router.asPath}/${encodeURIComponent(datum.slug)}`)
          }
        >
          {interactiveText}
        </button>
      </div>
    </div>
  </div>
);

export default DataCard;
