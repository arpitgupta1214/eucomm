import Image from "next/image";
import router from "next/router";

const TimelineCard = ({ timeline, light }) => (
  <div
    className={`${light ? "bg-skin-light" : "bg-skin-base"} cursor-pointer`}
    onClick={() => {
      router.push(`${router.asPath}/${timeline.slug}`);
    }}
  >
    <div className="w-full">
      <Image
        src={timeline.image.src}
        alt=""
        width={timeline.image.width}
        height={timeline.image.height}
        layout="responsive"
      />
    </div>

    <div className="py-4 px-6 text-xl font-bold">{timeline.name}</div>
  </div>
);

export default TimelineCard;
