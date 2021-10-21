import Image from "next/image";
import getPlaceholderImage from "util/getPlaceholderImg";

const HeadImage = ({ src }) => (
  <div className="mb-6 md:mb-10 w-full h-40 md:h-64 relative">
    <Image
      src={src}
      alt=""
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      placeholder="blur"
      blurDataURL={getPlaceholderImage()}
    />
  </div>
);

export default HeadImage;
