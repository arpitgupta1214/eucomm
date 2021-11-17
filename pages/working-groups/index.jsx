import Layout from "components/Layouts";
import { useState } from "react";
import WorkingGroupCard from "components/Cards/WorkingGroupCard";
import ListLoad from "components/ListLoad";
const WorkingGroups = (props) => {
  const [workingGroups, setWorkingGroups] = useState(props.groups.slice(0, 6));
  const [moreWorkingGroups, setMoreWorkingGroups] = useState(true);

  const loadMore = () => {
    setWorkingGroups(props.groups);
    setMoreWorkingGroups(false);
  };
  return (
    <div className="w-full mt-10 md:mt-16">
      <ListLoad
        head={props.pageHead}
        subhead={props.pageSubhead}
        data={workingGroups}
        cols={2}
        Component={({ item }) => <WorkingGroupCard workingGroup={item} />}
        more={moreWorkingGroups}
        moreText={props.loadMoreText}
        loadMore={loadMore}
      />
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
