import Badge from "components/ui/Badge/Badge";
import s from "../result.module.scss";
import React from "react";
import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";
import CustomIcon from "components/CustomIcon";
const iconMappings = {
  pdf: <CustomIcon name="GrDocumentPdf" />,
  ppt: <CustomIcon name="GrDocumentPpt" />,
  doc: <CustomIcon name="GrDocumentWord" />,
};

const Wrapper = ({ isMobile, children }) => {
  if (isMobile) {
    return (
      <div className="flex flex-col md:block min-w-0 ml-3">{children}</div>
    );
  } else {
    return children;
  }
};

const DocumentLibraryResult = ({ result }) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  return (
    <div className={`${s.card} bg-skin-light p-4 md:px-6 md:py-5`}>
      {/* file icon  */}
      <div className="w-8 h-8 flex-shrink-0">
        {iconMappings[result.fileType] &&
          React.cloneElement(iconMappings[result.fileType], {
            className: "h-full w-full",
          })}
      </div>
      <Wrapper isMobile={isMobile}>
        {/* content */}
        <div className={`${s.content} md:ml-3 md:mr-6 min-w-0`}>
          <span className="w-full whitespace-nowrap overflow-ellipsis overflow-hidden font-bold">
            {result.head}
          </span>
          <span className="text-sm text-skin-light">{result.subhead}</span>
        </div>

        <Badge type={result.category.id} name={result.category.name} />

        <div className="text-sm md:mx-8 flex-shrink-0">{result.date}</div>

        <button
          className={
            isMobile ? `${s.cta} flex items-center mt-2` : "text-skin-highlight"
          }
        >
          <FiDownload className="text-2xl mb-1 mr-2" />
          {isMobile && <span className="ml-2">Download</span>}
        </button>
      </Wrapper>
    </div>
  );
};

export default DocumentLibraryResult;
