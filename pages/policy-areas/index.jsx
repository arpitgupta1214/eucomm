import Layout from "components/Layouts";
import { useState } from "react";
import Image from "next/image";

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
      <div className="mb-10 content-md flex flex-col">
        <div className="mb-6 grid md:grid-cols-3 gap-6">
          {policies.map((policy, idx) => (
            <div
              key={`policy-${idx}`}
              className="w-full relative cursor-pointer"
            >
              {/* content */}
              <div className="absolute top-0 left-0 w-full py-5 px-6 z-10 bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                <div className="mb-1 font-bold text-xl text-white">
                  {policy.name}
                </div>
                <div className="text-sm text-white opacity-60">
                  {policy.description}
                </div>
              </div>
              <Image
                src={policy.image.src}
                alt=""
                width={policy.image.width}
                height={policy.image.height}
                layout="responsive"
                priority={true}
              />
            </div>
          ))}
        </div>

        {/* load more */}
        {morePolicies && (
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

PolicyAreas.layout = Layout;
export default PolicyAreas;

export const getStaticProps = async () => {
  const staticData = await import("data/policyAreas/data.json");

  return { props: { ...staticData } };
};
