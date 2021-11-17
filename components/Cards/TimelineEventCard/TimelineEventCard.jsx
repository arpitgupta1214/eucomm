import Image from "next/image";
import getPlaceholderImage from "util/getPlaceholderImg";

const TimelineCard = ({ event }) => (
  <div className="py-10 px-5 md:p-8 flex flex-col md:flex-row bg-skin-light">
    <div className="flex-grow mr-4">
      {/* event head */}
      <div className="mb-4 font-bold text-2xl leading-normal">{event.head}</div>

      {/* event date */}
      <div className="mb-4 text-skin-light text-sm leading-normal">
        {event.date}
      </div>

      <div className="mb-4 text-skin-light text-sm md:text-lg leading-relaxed">
        {event.content}
      </div>
    </div>
    <div className="flex-shrink-0 w-full md:max-w-xs">
      <Image
        src={event.image.src}
        alt=""
        width={event.image.width}
        height={event.image.height}
        layout="responsive"
        placeholder="blur"
        blurDataURL={getPlaceholderImage()}
      />
    </div>
  </div>
);

export default TimelineCard;
