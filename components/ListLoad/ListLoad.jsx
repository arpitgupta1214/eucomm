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
  secondary,
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
        <div className={`mb-6 ${isMobile ? "w-full" : "content-md"}`}>
          <div className={`w-full grid md:grid-cols-${cols || 1} gap-6`}>
            {data.map((item, idx) => (
              <Component key={`item-${idx}`} item={item} />
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
