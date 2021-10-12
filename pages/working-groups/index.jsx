import Layout from "components/Layouts";
import { ArrowButton } from "components/ui";
import router from "next/router";
import Image from "next/image";
import { useState } from "react";
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
            <div
              key={`group-${idx}`}
              className="bg-skin-light p-6 flex items-start md:items-center"
            >
              <div className="w-24 md:w-40 h-24 md:h-40 flex-shrink-0 mr-5 relative">
                <Image
                  src={group.image.src}
                  alt=""
                  layout="fill"
                  priority={true}
                />
              </div>
              <div className="flex-grow">
                <div className="mb-1.5 md:mb-2 text-sm md:text-xl font-bold">
                  {group.name}
                </div>
                <div className="mb-1.5 md:mb-1 text-xs md:text-sm text-skin-light ">
                  {group.description}
                </div>
                <div className="w-10 md:w-12 h-10 md:h-12">
                  <ArrowButton
                    direction="forward"
                    onClick={() =>
                      router.push(`${router.asPath}/${group.slug}`)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* load more */}
        {moreWorkingGroups && (
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
