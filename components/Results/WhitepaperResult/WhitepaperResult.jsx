import Badge from "components/ui/Badge/Badge";
import { BiDownload } from "react-icons/bi";
import s from "../result.module.scss";
import Image from "next/image";

const WhitepaperResult = ({ result }) => {
  return (
    <div className={`${s.card} bg-skin-light items-start md:items-center`}>
      <div className="w-1/3 md:w-1/5 ml-4 md:ml-5 mt-4 md:mt-0">
        <Image
          src={result.img}
          alt=""
          layout="responsive"
          width={226}
          height={296}
        />
      </div>

      {/* content */}
      <div className={`${s.content} px-5 my-4 md:my-6`}>
        <Badge type={result.category.id} name={result.category.name} />
        <h1 className="md:w-3/5 max-line-2">{result.head}</h1>
        <h2 className="hidden md:block max-line-2">{result.subhead}</h2>
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
