import Badge from "components/ui/Badge/Badge";
import s from "../result.module.scss";
import pS from "./publicationResult.module.scss";

const PublicationResult = ({ result }) => {
  return (
    <div className={`${s.card} md:items-start flex-wrap md:flex-nowrap`}>
      {/* img  */}
      <div
        className={`${pS.sideImg} md:h-full flex-shrink-0 bg-no-repeat bg-cover bg-center`}
        style={{ backgroundImage: `url(${result.img})` }}
      />
      {/* content */}
      <div className={`${s.content} md:px-5 mt-5 md:my-2`}>
        <Badge type={result.category.id} name={result.category.name} />
        <h1>{result.head}</h1>
        <h2>{result.subhead}</h2>
        <h3>{result.date}</h3>
        <button className={`${s.cta} hidden md:block`}>
          <span>Read More</span>
        </button>
      </div>
    </div>
  );
};

export default PublicationResult;
