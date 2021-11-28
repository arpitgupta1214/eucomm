import { Button } from "components/ui";
import { useSelector } from "react-redux";

const ListLoad = ({
  head,
  subhead,
  more,
  moreText,
  loadMore,
  data,
  Component,
  cols,
  rows,
  secondary,
  mosaic,
}) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  return (
    <div
      className={`w-full flex flex-col items-center ${
        secondary ? "py-10 md:py-32 bg-skin-light" : ""
      }`}
    >
      {head && (
        <div
          className={`mb-6 content-md ${
            secondary ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"
          } font-bold md:text-center`}
        >
          {head}
        </div>
      )}

      {subhead && (
        <div className="mb-6 max-w-2xl mx-4 md:text-center text-skin-light">
          {subhead}
        </div>
      )}

      <div className="mb-10 w-full flex flex-col items-center">
        <div
          className={`mb-6 ${
            isMobile ? "w-full overflow-x-auto" : "content-md"
          }`}
        >
          <div
            className={`grid ${
              isMobile
                ? `grid-rows-${rows || 1} ${rows ? "grid-flow-col" : ""}`
                : `grid-cols-${cols || 1} grid-flow-row`
            } ${mosaic && !isMobile ? "gap-2.5" : "gap-6"}`}
          >
            {data.map((item, idx) => (
              <div
                key={`item-${idx}`}
                className={`${
                  !isMobile && mosaic
                    ? idx % cols === 0
                      ? "col-span-2"
                      : idx % (cols * 2) === 2
                      ? "row-span-2"
                      : "aspect-ratio-1"
                    : ""
                } h-full`}
              >
                <Component item={item} />
              </div>
            ))}
          </div>
        </div>
        {/* load more */}
        {more && <Button text={moreText || "Load More"} onClick={loadMore} />}
      </div>
    </div>
  );
};

export default ListLoad;
