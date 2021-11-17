import Layout from "components/Layouts";
import { useState } from "react";
import PolicyCard from "components/Cards/PolicyCard";
import ListLoad from "components/ListLoad";

const PolicyAreas = (props) => {
  const [policies, setPolicies] = useState(props.policies.slice(0, 6));
  const [morePolicies, setMorePolicies] = useState(true);

  const loadMore = () => {
    setPolicies(props.policies);
    setMorePolicies(false);
  };
  return (
    <div className="mt-10 md:mt-16">
      <ListLoad
        head={props.pageHead}
        data={policies}
        cols={3}
        Component={({ item }) => <PolicyCard policy={item} />}
        more={morePolicies}
        moreText={props.loadMoreText}
        loadMore={loadMore}
      />
    </div>
  );
};

PolicyAreas.layout = Layout;
export default PolicyAreas;

export const getStaticProps = async () => {
  const staticData = await import("data/policyAreas/data.json");

  return { props: { ...staticData } };
};
