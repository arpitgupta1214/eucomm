import Layout from "components/Layouts";
import Image from "next/image";

const BecomeAMember = (props) => {
  return (
    <div className="mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-3 font-bold text-5xl">{props.pageHead}</div>

      {/* head image */}
      <div className="mb-10 w-full">
        <Image
          src={props.headImage.src}
          alt=""
          width={props.headImage.width}
          height={props.headImage.height}
          layout="responsive"
        />
      </div>

      {/* stats */}
      <div className="mb-16 content-sm flex justify-between">
        {props.headStats.map((stat, idx) => (
          <div key={`stat-${idx}`} className="flex flex-col items-center">
            <div className="mb-2 font-bold text-4xl text-skin-highlight">
              {stat.number}
            </div>
            <div className="text-skin-light">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* content */}
      <div className="mb-32 content-md flex">
        <div className="mr-9 flex-shrink overflow-hidden grid grid-flow-row gap-4">
          <div className="font-bold text-2xl">{props.benefitsHead}</div>
          {props.benefits.map((benefit, idx) => (
            <div key={`benefit-${idx}`} className="text-lg">
              <span className="font-bold">{idx + 1}. </span>
              <span className="text-skin-light">{benefit}</span>
            </div>
          ))}
        </div>

        {/* contacts */}
        <div className="self-start px-5 py-4 bg-skin-light">
          <div className="mb-2 text-xs whitespace-nowrap text-skin-light">
            {props.contactHead}
          </div>
          <div className="w-56 grid grid-flow-row gap-3">
            {props.contacts.map((contact, idx) => (
              <div
                key={`contact-${idx}`}
                className="p-3 shadow-sm bg-skin-base flex"
              >
                <div className="mr-3 w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={contact.image.src}
                    alt=""
                    width={contact.image.width}
                    height={contact.image.height}
                    layout="responsive"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="mb-1 font-bold text-sm">{contact.name}</div>
                  <div className="mb-2 text-xs text-skin-light">
                    {contact.title}
                  </div>
                  <button className="px-4 py-2 border border-skin-highlight text-skin-highlight font-medium text-sm">
                    {props.contactButtonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

BecomeAMember.layout = Layout;
export default BecomeAMember;

export const getStaticProps = async () => {
  const staticData = await import(
    "data/projects/membersArea/becomeAMember/data.json"
  );

  return { props: { ...staticData } };
};
