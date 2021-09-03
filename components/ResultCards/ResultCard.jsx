import Badge from "components/Badge/Badge";
import Image from "next/image";
import { BiDownload } from "react-icons/bi";
import s from "./resultCard.module.scss";

const ResultCard = ({ result }) => {
  return (
    <div
      className={`${s.card} px-6 py-9 mb-10 bg-skin-light flex items-center`}
    >
      <img src={result.img} alt="" className="w-1/6" />
      {/* content */}
      <div className="flex flex-col ml-5">
        <Badge type={result.category.id} name={result.category.name} />
        <h1 className="font-bold text-2xl mb-1 w-3/5">{result.head}</h1>
        <h2 className="text-skin-light mb-2">{result.subhead}</h2>
        <h3 className="text-xs text-skin-extra-light mb-4">{result.date}</h3>
        <button className={s.download}>
          <BiDownload className="text-lg mb-1 mr-2" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
