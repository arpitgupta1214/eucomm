import CustomIcon from "components/CustomIcon";
import Badge from "components/ui/Badge/Badge";
import router from "next/router";
import s from "../result.module.scss";
import wS from "./webinarResult.module.scss";
const WebinarResult = ({ result }) => {
  return (
    <div
      className={`${s.card} bg-skin-light flex-wrap md:flex-nowrap items-center`}
    >
      {/* img  */}
      <div
        className={`${wS.sideImg} md:h-full w-full md:w-1/3 flex-shrink-0 bg-no-repeat bg-cover bg-center`}
        style={{ backgroundImage: `url(${result.img})` }}
      />
      {/* content */}
      <div
        className={`${s.content} w-1/2 md:w-auto px-5 my-5 md:my-6 border-r border-skin-base`}
      >
        <Badge type={result.category.id} name={result.category.name} />
        <h1 className="max-line-2">{result.head}</h1>
        <h2 className="max-line-2">{result.subhead}</h2>
        <h3>{result.date}</h3>
        <button
          className={s.cta}
          onClick={() =>
            router.push(`/events-n-webinars/events/${result.slug}`)
          }
        >
          <span>Register Now</span>
        </button>
      </div>

      {/* date time */}
      <div className="w-1/3 mx-6 flex flex-col justify-center items-center">
        <div className="font-medium text-sm flex items-center">
          <span className="text-skin-highlight mr-2 text-lg pb-1">
            <CustomIcon name="BiCalendar" />
          </span>
          <span>{result.date}</span>
        </div>
        <div className="font-medium text-sm flex items-center mt-4">
          <span className="text-skin-highlight mr-2 text-lg pb-1">
            <CustomIcon name="BsClockFill" />
          </span>
          <span>{result.time}</span>
        </div>
      </div>
    </div>
  );
};

export default WebinarResult;
