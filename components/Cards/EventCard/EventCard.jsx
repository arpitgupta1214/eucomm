import CustomIcon from "components/CustomIcon";
import { ArrowButton } from "components/ui";
import router from "next/router";

const EventCard = ({ event, date, month, year, light }) => (
  <div
    className={`py-5 px-3 md:px-7 ${
      light ? "bg-skin-light" : "bg-skin-base"
    } flex flex-col`}
  >
    <div className="mb-6 md:mb-8 flex justify-between">
      {/* date */}
      <div className="flex flex-col">
        <div className="font-bold text-4xl md:text-5xl text-skin-highlight">
          {date}
        </div>
        <div className="text-xs text-skin-light">
          {month}, {year}
        </div>
      </div>
      <div className="w-12 h-12">
        <ArrowButton
          direction="forward"
          onClick={() => router.push(`${router.asPath}/${event.slug}`)}
        />
      </div>
    </div>
    <div className="grid grid-flow-row gap-3">
      <div className="w-5/6 text-lg md:text-xl font-bold">{event.head}</div>
      <div className="flex text-sm">
        <CustomIcon
          name="AiOutlineClockCircle"
          className="mr-2 text-skin-highlight"
        />
        <span className="text-skin-light">{event.time}</span>
      </div>
      <div className="flex text-sm">
        <CustomIcon
          name="HiOutlineDesktopComputer"
          className="mr-2 text-skin-highlight"
        />
        <span className="text-skin-light">{event.mode}</span>
      </div>
    </div>
  </div>
);

export default EventCard;
