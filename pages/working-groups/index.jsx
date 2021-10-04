import Layout from "components/Layouts";
import { ArrowButton } from "components/ui";
import router from "next/router";
import Image from "next/image";
const WorkingGroups = (props) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-5 text-5xl font-bold">{props.pageHead}</div>

      {/* subhead */}
      <div className="mb-6 max-w-2xl mx-4 text-center text-skin-light">
        {props.pageSubhead}
      </div>

      {/* groups */}
      <div className="mb-32 content-md grid grid-cols-2 gap-6">
        {props.groups.map((group, idx) => (
          <div
            key={`group-${idx}`}
            className="bg-skin-light p-6 flex items-center"
          >
            <div className="w-40 h-40 flex-shrink-0 mr-5 relative">
              <Image
                src={group.image.src}
                alt=""
                layout="fill"
                priority={true}
              />
            </div>
            <div className="flex-grow">
              <div className="text-xl font-bold mb-2">{group.name}</div>
              <div className="text-sm text-skin-light mb-2">
                {group.description}
              </div>
              <div className="w-12 h-12">
                <ArrowButton
                  direction="forward"
                  onClick={() => router.push(`${router.asPath}/${group.slug}`)}
                />
              </div>
            </div>
          </div>
        ))}
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
