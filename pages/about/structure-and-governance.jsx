import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import Image from "next/image";

const Structure = (props) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-5 text-5xl font-bold">{props.pageHead}</div>

      {/* headimg */}
      <div className="w-full mb-12">
        <Image
          src={props.headImg}
          alt=""
          width={5760}
          height={1120}
          layout="responsive"
        />
      </div>

      <div className="w-full max-w-4xl">
        {/* subhead */}
        <div className="mb-12 text-skin-light">{props.subhead}</div>

        {/* groups */}
        <div className="mb-16">
          {props.groups.map((group) => (
            <div key={`group-${group.name}`} className="mb-12">
              <div className="mb-5 text-2xl font-bold">{group.name}</div>

              {group.description.split("\n").map((description, idx) => (
                <div
                  key={`description-${idx}`}
                  className="mb-5 text-skin-light"
                >
                  {description}
                </div>
              ))}

              <div className="grid grid-cols-4 gap-5">
                {group?.members?.map((member) => (
                  <div key={`${group.name}-${member.name}`} className="w-full">
                    {/* img */}
                    <div className="mb-3 rounded-xl overflow-hidden">
                      <Image
                        src={member.image}
                        alt=""
                        width={200}
                        height={200}
                        layout="responsive"
                      />
                    </div>
                    <div className="mb-1 font-bold text-xl">{member.name}</div>
                    <div className="text-xs">{member.jobTitle}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-content mb-32 rounded-xl overflow-hidden">
        <Newsletter />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import(
    "data/about/structure-and-governance/data.json"
  ).then((data) => data.default);

  return {
    props: {
      ...staticData,
    },
  };
};

Structure.layout = Layout;
export default Structure;
