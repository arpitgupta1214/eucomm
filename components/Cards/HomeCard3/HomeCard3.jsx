import CustomIcon from "components/CustomIcon";
import Image from "next/image";
import getPlaceholderImage from "util/getPlaceholderImg";
import s from "./homeCard3.module.scss";

const HomeCard3 = ({ item }) => (
  <div className={[s.main, "w-80 md:w-full h-full relative"].join(" ")}>
    <Image
      src={item.image.src}
      alt=""
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      priority={true}
      placeholder="blur"
      blurDataURL={getPlaceholderImage()}
      className="opacity-70"
    />
    <div
      className={[s.overlay, "absolute top-0 left-0 w-full h-full"].join(" ")}
    >
      <div className="absolute bottom-0 left-0 w-full px-6 py-4 flex justify-between items-center">
        <div className="mr-7 text-lg font-bold text-white">{item.name}</div>
        <button className="p-2 bg-skin-highlight">
          <CustomIcon className="text-white text-xl" name="BsArrowRight" />
        </button>
      </div>
    </div>
  </div>
);

export default HomeCard3;
