import Badge from "components/Badge/Badge";
import { BiDownload } from "react-icons/bi";
import s from "../result.module.scss";

const WhitepaperResult = ({ result }) => {
  return (
    <div className={`${s.card} bg-skin-light items-start md:items-center`}>
      <img
        src={result.img}
        alt=""
        className="w-1/3 md:w-1/6 ml-4 md:ml-5 mt-4"
      />
      {/* content */}
      <div className={`${s.content} px-5 my-4 md:my-9`}>
        <Badge type={result.category.id} name={result.category.name} />
        <h1 className="md:w-3/5">{result.head}</h1>
        <h2 className="hidden md:block">{result.subhead}</h2>
        <h3>{result.date}</h3>
        <button className={`${s.cta} flex items-center`}>
          <BiDownload className="text-lg mb-1 mr-2" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default WhitepaperResult;
