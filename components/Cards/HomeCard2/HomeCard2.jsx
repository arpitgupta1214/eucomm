import CustomIcon from "components/CustomIcon";
import Image from "next/image";
import getPlaceholderImage from "util/getPlaceholderImg";
import s from "./homeCard2.module.scss";

const HomeCard2 = ({ item }) => (
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
    />
    <div
      className={[s.overlay, "absolute top-0 left-0 w-full h-full"].join(" ")}
    >
      <div className="px-6 py-4 flex items-center absolute bottom-0 left-0">
        <div className="mr-1 text-lg md:text-xl font-bold text-white">
          {item.name}
        </div>
        <CustomIcon
          className="text-skin-highlight text-xl"
          name="BsArrowRight"
        />
      </div>
    </div>
  </div>
);

export default HomeCard2;
