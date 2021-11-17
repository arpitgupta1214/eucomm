import DataCard from "components/Cards/DataCard";
import Layout from "components/Layouts";
import ListLoad from "components/ListLoad";
import { useState } from "react";

const Data = (props) => {
  const [data, setData] = useState(props.data.slice(0, 6));
  const [moreData, setMoreData] = useState(true);

  const loadMore = () => {
    setData(props.data);
    setMoreData(false);
  };
  return (
    <div className="mt-16">
      <ListLoad
        head={props.pageHead}
        data={data}
        cols={2}
        Component={({ item }) => (
          <DataCard
            datum={item}
            downloadAsText={props.downloadAsText}
            interactiveText={props.interactiveText}
            light
          />
        )}
        more={moreData}
        moreText={props.loadMoreText}
        loadMore={loadMore}
      />
    </div>
  );
};

Data.layout = Layout;
export default Data;

export const getStaticProps = async () => {
  const staticData = await import("data/data/data.json");

  return { props: { ...staticData } };
};
