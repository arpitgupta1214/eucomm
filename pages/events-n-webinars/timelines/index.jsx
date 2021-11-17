import Layout from "components/Layouts";
import TimelineCard from "components/Cards/TimelineCard";
import { useState } from "react";
import ListLoad from "components/ListLoad";

const Timelines = (props) => {
  const [timelines, setTimelines] = useState(props.timelines.slice(0, 6));
  const [moreTimelines, setMoreTimelines] = useState(true);

  const loadMore = () => {
    setTimelines(props.timelines);
    setMoreTimelines(false);
  };
  return (
    <div className="mt-10 md:mt-16">
      <ListLoad
        head={props.pageHead}
        data={timelines}
        cols={3}
        Component={({ item }) => <TimelineCard timeline={item} light />}
        more={moreTimelines}
        moreText={props.loadMoreText}
        loadMore={loadMore}
      />
    </div>
  );
};

Timelines.layout = Layout;
export default Timelines;

export const getStaticProps = async () => {
  const staticData = await import("data/timelines/data.json");
  return { props: { ...staticData } };
};
