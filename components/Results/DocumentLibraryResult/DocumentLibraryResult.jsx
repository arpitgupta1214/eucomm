import Badge from "components/Badge/Badge";
import s from "../result.module.scss";
import React from "react";
import { GrDocumentPpt, GrDocumentPdf, GrDocumentWord } from "react-icons/gr";
import { FiDownload } from "react-icons/fi";
const iconMappings = {
  pdf: <GrDocumentPdf />,
  ppt: <GrDocumentPpt />,
  doc: <GrDocumentWord />,
};

const DocumentLibraryResult = ({ result }) => {
  return (
    <div className={`${s.card} px-6 py-5`}>
      {/* file icon  */}
      <div className="w-8 h-8">
        {iconMappings[result.fileType] &&
          React.cloneElement(iconMappings[result.fileType], {
            className: "h-full w-full",
          })}
      </div>

      {/* content */}
      <div className={`${s.content} ml-3 mr-6 min-w-0`}>
        <span className="w-full whitespace-nowrap overflow-ellipsis overflow-hidden font-bold">
          {result.head}
        </span>
        <span className="text-sm text-skin-light">{result.subhead}</span>
      </div>

      <Badge type={result.category.id} name={result.category.name} />

      <div className="text-sm mx-8 flex-shrink-0">{result.date}</div>

      <button className="text-skin-highlight">
        <FiDownload className="text-2xl mb-1 mr-2" />
      </button>
    </div>
  );
};

export default DocumentLibraryResult;