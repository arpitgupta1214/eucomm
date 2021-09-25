import Layout from "components/Layouts";
import { ArrowButton } from "components/ui";

const WorkingGroups = (props) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-5 text-5xl font-bold">{props.pageHead}</div>

      {/* subhead */}
      <div className="mb-6 max-w-2xl mx-4 text-center">{props.pageSubhead}</div>

      {/* groups */}
      <div className="mb-32 w-full max-w-content grid grid-cols-3 gap-6">
        {props.groups.map((group, idx) => (
          <div key={`group-${idx}`} className="rounded-xl bg-skin-light p-6">
            <div className="text-xl mb-2">{group.name}</div>
            <div className="text-xs text-skin-light mb-2">
              {group.description}
            </div>
            <div className="w-11 h-11">
              <ArrowButton
                direction="forward"
                onClick={() => {
                  console.log(group.slug);
                }}
              />
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
