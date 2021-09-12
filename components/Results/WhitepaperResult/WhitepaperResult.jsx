import Badge from "components/Badge/Badge";
import { BiDownload } from "react-icons/bi";
import s from "../result.module.scss";

const WhitepaperResult = ({ result }) => {
  return (
    <div className={`${s.card}`}>
      <img src={result.img} alt="" className="w-1/6 ml-5" />
      {/* content */}
      <div className={`${s.content} px-5 my-9`}>
        <Badge type={result.category.id} name={result.category.name} />
        <h1 className="w-3/5">{result.head}</h1>
        <h2>{result.subhead}</h2>
        <h3>{result.date}</h3>
        <button className={s.cta}>
          <BiDownload className="text-lg mb-1 mr-2" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default WhitepaperResult;
