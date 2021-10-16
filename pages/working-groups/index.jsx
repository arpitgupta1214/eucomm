import Layout from "components/Layouts";
import { Button } from "components/ui";
import { useState } from "react";
import WorkingGroupCard from "components/WorkingGroupCard";
const WorkingGroups = (props) => {
  const [workingGroups, setWorkingGroups] = useState(props.groups.slice(0, 6));
  const [moreWorkingGroups, setMoreWorkingGroups] = useState(true);

  const loadMore = () => {
    setWorkingGroups(props.groups);
    setMoreWorkingGroups(false);
  };
  return (
    <div className="w-full mt-10 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-4 md:mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* subhead */}
      <div className="mb-6 max-w-2xl mx-4 md:text-center text-skin-light">
        {props.pageSubhead}
      </div>

      {/* groups */}
      <div className="mb-10 md:mb-32 flex flex-col items-center">
        <div className="mb-6 content-md grid md:grid-cols-2 gap-6">
          {workingGroups.map((group, idx) => (
            <WorkingGroupCard key={`group-${idx}`} workingGroup={group} />
          ))}
        </div>

        {/* load more */}
        {moreWorkingGroups && (
          <Button text={props.loadMoreText} onClick={loadMore} />
        )}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/workingGroups/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

WorkingGroups.layout = Layout;
export default WorkingGroups;
