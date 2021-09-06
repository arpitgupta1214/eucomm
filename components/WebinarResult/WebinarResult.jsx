import Badge from "components/Badge/Badge";
import Image from "next/image";
import { BiCalendar } from "react-icons/bi";
import { BsClockFill } from "react-icons/bs";
import s from "./webinarResult.module.scss";

const WebinarResult = ({ result }) => {
  return (
    <div className={`${s.card} mb-10 bg-skin-light flex items-center`}>
      {/* img  */}
      <div
        className="h-full w-1/3 flex-shrink-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${result.img})` }}
      />
      {/* content */}
      <div className="flex-grow flex flex-col px-5 my-9 border-r border-skin-base">
        <Badge type={result.category.id} name={result.category.name} />
        <h1 className="font-bold w-full text-2xl mb-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {result.head}
        </h1>
        <h2 className="text-skin-light mb-2">{result.subhead}</h2>
        <h3 className="text-xs text-skin-extra-light mb-4">{result.date}</h3>
        <button className={s.register}>
          <span>Register Now</span>
        </button>
      </div>

      {/* date time */}
      <div className="w-1/3 mx-6 flex flex-col justify-center items-center">
        <div className="font-medium text-sm flex items-center">
          <span className="text-skin-highlight mr-2 text-lg pb-1">
            <BiCalendar />
          </span>
          <span>{result.date}</span>
        </div>
        <div className="font-medium text-sm flex items-center mt-4">
          <span className="text-skin-highlight mr-2 text-lg pb-1">
            <BsClockFill />
          </span>
          <span>{result.time}</span>
        </div>
      </div>
    </div>
  );
};

export default WebinarResult;
