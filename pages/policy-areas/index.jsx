import Layout from "components/Layouts";
import { useState } from "react";
import { Button } from "components/ui";
import PolicyCard from "components/Cards/PolicyCard";

const PolicyAreas = (props) => {
  const [policies, setPolicies] = useState(props.policies.slice(0, 6));
  const [morePolicies, setMorePolicies] = useState(true);

  const loadMore = () => {
    setPolicies(props.policies);
    setMorePolicies(false);
  };
  return (
    <div className="mt-10 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* policies */}
      <div className="mb-10 content-md flex flex-col items-center">
        <div className="mb-6 w-full grid md:grid-cols-3 gap-6">
          {policies.map((policy, idx) => (
            <PolicyCard key={`policy-${idx}`} policy={policy} />
          ))}
        </div>

        {/* load more */}
        {morePolicies && (
          <Button text={props.loadMoreText} onClick={loadMore} />
        )}
      </div>
    </div>
  );
};

PolicyAreas.layout = Layout;
export default PolicyAreas;

export const getStaticProps = async () => {
  const staticData = await import("data/policyAreas/data.json");

  return { props: { ...staticData } };
};
