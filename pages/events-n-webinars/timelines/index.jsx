import Layout from "components/Layouts";
import TimelineCard from "components/Cards/TimelineCard";
import { Button } from "components/ui";
import { useState } from "react";

const Timelines = (props) => {
  const [timelines, setTimelines] = useState(props.timelines.slice(0, 6));
  const [moreTimelines, setMoreTimelines] = useState(true);

  const loadMore = () => {
    setTimelines(props.timelines);
    setMoreTimelines(false);
  };
  return (
    <div className="mt-10 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      <div className="mb-10 md:mb-32 content-md flex flex-col items-center">
        {/* envents */}
        <div className="mb-6 w-full grid md:grid-cols-3 gap-5 md:gap-6">
          {timelines.map((timeline, idx) => {
            return (
              <TimelineCard key={`timeline-${idx}`} timeline={timeline} light />
            );
          })}
        </div>

        {/* load more */}
        {moreTimelines && (
          <Button text={props.loadMoreText} onClick={loadMore} />
        )}
      </div>
    </div>
  );
};

Timelines.layout = Layout;
export default Timelines;

export const getStaticProps = async () => {
  const staticData = await import("data/timelines/data.json");
  return { props: { ...staticData } };
};
