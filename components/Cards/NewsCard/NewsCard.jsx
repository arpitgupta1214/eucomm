import s from "./newsCard.module.scss";
import Image from "next/image";
import CustomIcon from "components/CustomIcon";
const NewsCard = ({ item }) => {
  return (
    <div
      className={[
        s.main,
        "w-72 md:w-full flex flex-col transition-all cursor-pointer",
      ].join(" ")}
    >
      <div className={[s.image, "relative w-full"].join(" ")}>
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
            "absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-70 opacity-0",
          ].join(" ")}
        >
          <CustomIcon
            name="BsArrowRight"
            className="text-3xl text-skin-highlight"
          />
        </div>
      </div>
      <div
        className={[s.content, "py-3 px-4 bg-skin-light flex flex-col"].join(
          " "
        )}
      >
        <span className="mb-2 font-bold">{item.head}</span>
        <span className="mb-2 text-sm text-skin-light max-line-2">
          {item.description}
        </span>
        <span className="text-xs text-skin-extra-light">{item.date}</span>
      </div>
    </div>
  );
};

export default NewsCard;
