import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import Image from "next/image";
import { useSelector } from "react-redux";

const Team = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* teams */}
      <div className="md:mb-16 w-full px-4 md:p-0 max-w-4xl ">
        {props.teams.map((team) => (
          <div key={`team-${team.name}`} className="w-full mb-10 md:mb-16">
            <div className="mb-4 text-sm font-bold text-skin-light">
              {team.name}
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {team.members.map((member) => (
                <div key={`${team.name}-${member.name}`} className="w-full">
                  {/* img */}
                  <div className="mb-3 w-full">
                    <Image
                      src={member.image.src}
                      alt=""
                      width={member.image.width}
                      height={member.image.height}
                      layout="responsive"
                      priority={true}
                    />
                  </div>
                  <div className="mb-1 font-bold text-xl">{member.name}</div>
                  <div className="text-xs font-medium text-skin-light">
                    {member.jobTitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`mb-3 md:mb-32 ${!isMobile ? "content-sm" : ""}`}>
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
