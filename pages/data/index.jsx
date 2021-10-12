import DataCard from "components/DataCard";
import Layout from "components/Layouts";
import { useState } from "react";

const Data = (props) => {
  const [data, setData] = useState(props.data.slice(0, 6));
  const [moreData, setMoreData] = useState(true);

  const loadMore = () => {
    setData(props.data);
    setMoreData(false);
  };
  return (
    <div className="mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* data */}
      <div className="mb-10 md:mb-32 content-md flex flex-col items-center">
        <div className="mb-6 w-full grid md:grid-cols-2 gap-6">
          {data.map((datum, idx) => (
            <DataCard
              key={`datum-${idx}`}
              datum={datum}
              downloadAsText={props.downloadAsText}
              interactiveText={props.interactiveText}
              light
            />
          ))}
        </div>

        {/* load more */}
        {moreData && (
          <button
            className="py-3 px-6 text-skin-highlight border border-skin-highlight"
            onClick={loadMore}
          >
            {props.loadMoreText}
          </button>
        )}
      </div>
    </div>
  );
};

Data.layout = Layout;
export default Data;

export const getStaticProps = async () => {
  const staticData = await import("data/data/data.json");

  return { props: { ...staticData } };
};
