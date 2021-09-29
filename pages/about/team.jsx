import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import Image from "next/image";

const Team = (props) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 text-5xl font-bold">{props.pageHead}</div>

      {/* teams */}
      <div className="w-full max-w-4xl mb-16">
        {props.teams.map((team) => (
          <div key={`team-${team.name}`} className="w-full mb-16">
            <div className="mb-4 text-sm font-bold text-skin-light">
              {team.name}
            </div>
            <div className="w-full grid grid-cols-4 gap-6">
              {team.members.map((member) => (
                <div key={`${team.name}-${member.name}`} className="w-full">
                  {/* img */}
                  <div className="mb-3 w-full">
                    <Image
                      src={member.image}
                      alt=""
                      width={1}
                      height={1}
                      layout="responsive"
                    />
                  </div>
                  <div className="mb-1 font-bold text-xl">{member.name}</div>
                  <div className="text-xs text-skin-light">
                    {member.jobTitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="content-sm mb-32">
        <Newsletter />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/about/team/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

Team.layout = Layout;
export default Team;
