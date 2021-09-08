import Badge from "components/Badge/Badge";
import Image from "next/image";
import { BiCalendar } from "react-icons/bi";
import { BsClockFill } from "react-icons/bs";
import s from "../result.module.scss";

const WebinarResult = ({ result }) => {
  return (
    <div className={s.card}>
      {/* img  */}
      <div
        className="h-full w-1/3 flex-shrink-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${result.img})` }}
      />
      {/* content */}
      <div className={s.content}>
        <Badge type={result.category.id} name={result.category.name} />
        <h1>{result.head}</h1>
        <h2>{result.subhead}</h2>
        <h3>{result.date}</h3>
        <button className={s.cta}>
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
