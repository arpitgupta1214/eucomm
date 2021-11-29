import s from "./newsCard2.module.scss";
import Image from "next/image";
import CustomIcon from "components/CustomIcon";
const NewsCard2 = ({ item }) => {
  return (
    <div
      className={[
        s.main,
        "w-72 md:w-full relative transition-all cursor-pointer",
      ].join(" ")}
    >
      <div className="absolute w-full h-full top-0 left-0">
        <Image
          src={item.image.src}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div
          className={[
            s.overlay,
            "absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-30",
          ].join(" ")}
        ></div>
      </div>
      <div
        className={[
          s.content,
          "z-10 p-6 absolute top-0 left-0 w-full h-full flex flex-col justify-between",
        ].join(" ")}
      >
        <button className="p-2.5 bg-skin-highlight text-white self-end opacity-0">
          <CustomIcon name="BsArrowRight" />
        </button>
        <div className="flex flex-col items-start text-white">
          <span className="mb-2 text-xs">{item.date}</span>
          <span className="mb-2 text-lg font-bold">{item.head}</span>
          <span className="text-sm leading-relaxed">{item.description}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard2;
