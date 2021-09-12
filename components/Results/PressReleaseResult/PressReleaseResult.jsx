import Badge from "components/Badge/Badge";
import s from "../result.module.scss";

const PressReleaseResult = ({ result }) => {
  return (
    <div className="cursor-pointer">
      {/* content */}
      <div className={`${s.content} pb-9 border-b border-skin-base`}>
        <Badge type={result.category.id} name={result.category.name} />
        <h1 className="font-bold text-xl mt-2 mb-4">{result.head}</h1>
        <h3 className="text-xs text-skin-extra-light">{result.date}</h3>
      </div>
    </div>
  );
};

export default PressReleaseResult;
