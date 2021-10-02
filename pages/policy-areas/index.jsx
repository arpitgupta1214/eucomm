import Layout from "components/Layouts";
import { useState } from "react";
import Image from "next/image";

const PolicyAreas = (props) => {
  const [activePolicyArea, setActivePolicyArea] = useState(
    props.policyAreas[0]
  );

  return (
    <div className="mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-3 font-bold text-5xl">{props.pageHead}</div>

      {/* selector */}
      <div className="mb-10 bg-skin-light rounded-full p-0.5 flex">
        {props.policyAreas.map((policyArea, idx) => (
          <button
            key={`policy-area-${idx}`}
            className={`py-2 px-3 rounded-full text-sm ${
              activePolicyArea.slug === policyArea.slug
                ? "text-skin-base bg-skin-base"
                : "text-skin-highlight bg-none"
            }`}
            onClick={() => setActivePolicyArea(policyArea)}
          >
            {policyArea.name}
          </button>
        ))}
      </div>

      {/* policies */}
      <div className="mb-32 content-md grid grid-cols-3 gap-6">
        {activePolicyArea.policies.map((policy, idx) => (
          <div
            key={`${activePolicyArea.slug}-policy-${idx}`}
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
            />
          </div>
        ))}
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
