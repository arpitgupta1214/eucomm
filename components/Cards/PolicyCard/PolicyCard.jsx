import Image from "next/image";
import router from "next/router";
import getPlaceholderImage from "util/getPlaceholderImg";

const PolicyCard = ({ policy }) => (
  <div
    className="w-full relative cursor-pointer"
    onClick={() => router.push(`${router.asPath}/${policy.slug}`)}
  >
    {/* content */}
    <div className="absolute top-0 left-0 w-full py-5 px-6 z-10 bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-lg">
      <div className="mb-1 font-bold text-xl text-white">{policy.name}</div>
      <div className="text-sm text-white opacity-60">{policy.description}</div>
    </div>
    <div className="w-full responsive" style={{ paddingTop: "72%" }}>
      <Image
        src={policy.image.src}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority={true}
        placeholder="blur"
        blurDataURL={getPlaceholderImage()}
      />
    </div>
  </div>
);
export default PolicyCard;
