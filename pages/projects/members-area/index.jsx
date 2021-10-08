import Layout from "components/Layouts";
import { useMemo, useState } from "react";
import Image from "next/image";
import router from "next/router";

const MembersArea = (props) => {
  const memberGroups = useMemo(
    () => [
      {
        name: "All",
        members: props.memberGroups.reduce(
          (members, memberGroup) => [...members, ...memberGroup.members],
          []
        ),
      },
      ...props.memberGroups,
    ],
    [props.memberGroups]
  );
  const [activeMemberGroup, setActiveMemberGroup] = useState(memberGroups[0]);

  return (
    <div className="mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-3 font-bold text-5xl">{props.pageHead}</div>

      {/* join button */}
      <button
        className="mb-10 px-6 py-3 text-white bg-skin-highlight"
        onClick={() => router.push(`${router.asPath}/become-a-member`)}
      >
        {props.joinText}
      </button>
      {/* selector */}
      <div className="mb-10 bg-skin-light rounded-full p-0.5 flex">
        {memberGroups.map((memberGroup, idx) => (
          <button
            key={`member-group-${idx}`}
            className={`py-2 px-3 rounded-full text-sm ${
              activeMemberGroup.name === memberGroup.name
                ? "text-skin-base bg-skin-base"
                : "text-skin-highlight bg-none"
            }`}
            onClick={() => setActiveMemberGroup(memberGroup)}
          >
            {memberGroup.name}
          </button>
        ))}
      </div>

      {/* members */}
      <div className="mb-32 content-md flex justify-center flex-wrap">
        {activeMemberGroup.members.map((member, idx) => (
          <div
            key={`member-${idx}`}
            className="mx-3 mb-6 w-52 flex justify-center items-center bg-skin-light"
          >
            <div className="mx-12 py-11 w-full">
              <Image
                src={member.image.src}
                alt=""
                width={member.image.width}
                height={member.image.height}
                layout="responsive"
                priority={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MembersArea.layout = Layout;
export default MembersArea;

export const getStaticProps = async () => {
  const staticData = await import("data/membersArea/data.json");

  return { props: { ...staticData } };
};
