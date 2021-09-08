import Badge from "components/Badge/Badge";
import Image from "next/image";
import { BiCalendar } from "react-icons/bi";
import { BsClockFill } from "react-icons/bs";
import s from "../result.module.scss";

const PublicationResult = ({ result }) => {
  return (
    <div className={s.card}>
      {/* img  */}
      <div
        className="h-full flex-shrink-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${result.img})`, width: "27%" }}
      />
      {/* content */}
      <div className={s.content}>
        <Badge type={result.category.id} name={result.category.name} />
        <h1>{result.head}</h1>
        <h2>{result.subhead}</h2>
        <h3>{result.date}</h3>
        <button className={s.cta}>
          <span>Read More</span>
        </button>
      </div>
    </div>
  );
};

export default PublicationResult;
