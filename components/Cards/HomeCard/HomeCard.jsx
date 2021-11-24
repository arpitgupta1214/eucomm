import CustomIcon from "components/CustomIcon";
import Image from "next/image";
import getPlaceholderImage from "util/getPlaceholderImg";

const HomeCard = ({ item }) => (
  <div className="flex flex-col">
    <div className="w-full">
      <Image
        src={item.image.src}
        alt=""
        width={item.image.width}
        height={item.image.height}
        layout="responsive"
        priority={true}
        placeholder="blur"
        blurDataURL={getPlaceholderImage()}
      />
    </div>
    <div className="py-6 flex items-center justify-between">
      <div className="text-lg md:text-xl font-bold">{item.name}</div>
      <button className="p-3 bg-skin-light">
        <CustomIcon className="text-skin-highlight" name="BsArrowRight" />
      </button>
    </div>
  </div>
);

export default HomeCard;
