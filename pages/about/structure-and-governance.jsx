import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import Image from "next/image";
import { useSelector } from "react-redux";
const Structure = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  return (
    <div className="w-full mt-11 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* headimg */}
      <div className="w-full h-40 md:h-72 mb-6 md:mb-12 relative">
        <Image
          src={props.headImg.src}
          alt=""
          layout="fill"
          priority={true}
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className="px-4 md:px-0 w-full max-w-4xl">
        {/* subhead */}
        <div className="mb-6 md:mb-12 text-sm md:text-base text-skin-light">
          {props.subhead}
        </div>

        {/* groups */}
        <div className="mb-16">
          {props.groups.map((group) => (
            <div key={`group-${group.name}`} className="mb-6 md:mb-12">
              <div className="mb-4 md:mb-5 text-lg md:text-2xl font-bold">
                {group.name}
              </div>

              {group.description.split("\n").map((description, idx) => (
                <div
                  key={`description-${idx}`}
                  className="mb-4 md:mb-5 text-sm md:text-base text-skin-light"
                >
                  {description}
                </div>
              ))}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {group?.members?.map((member) => (
                  <div key={`${group.name}-${member.name}`} className="w-full">
                    {/* img */}
                    <div className="mb-3">
                      <Image
                        src={member.image}
                        alt=""
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <div className="mb-1 font-bold md:text-xl">
                      {member.name}
                    </div>
                    <div className="text-xs">{member.jobTitle}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${!isMobile ? "content-sm" : ""} mb-3 md:mb-32`}>
        <Newsletter />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import(
    "data/about/structureAndGovernance/data.json"
  ).then((data) => data.default);

  return {
    props: {
      ...staticData,
    },
  };
};

Structure.layout = Layout;
export default Structure;
