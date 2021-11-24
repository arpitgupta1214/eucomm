import Layout from "components/Layouts";
import Stats from "components/Stats";
import { HeadImage } from "components/ui";
import Image from "next/image";
import getPlaceholderImage from "util/getPlaceholderImg";

const BecomeAMember = (props) => {
  return (
    <div className="mt-10 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* head image */}
      <HeadImage src={props.headImage.src} />

      {/* stats */}
      <div className="mb-10 md:mb-16">
        <Stats stats={props.headStats} />
      </div>

      {/* content */}
      <div className="md:mb-32 content-md flex flex-col items-center md:flex-row">
        <div className="mb-10 md:mb-0 md:mr-9 flex-shrink overflow-hidden grid grid-flow-row gap-4">
          <div className="font-bold text-xl md:text-2xl">
            {props.benefitsHead}
          </div>
          {props.benefits.map((benefit, idx) => (
            <div key={`benefit-${idx}`} className="md:text-lg">
              <span className="font-bold">{idx + 1}. </span>
              <span className="text-skin-light">{benefit}</span>
            </div>
          ))}
        </div>

        {/* contacts */}
        <div className="w-screen md:w-auto md:self-start px-5 py-10 md:py-4 bg-skin-light">
          <div className="mb-2 text-xs whitespace-nowrap text-skin-light">
            {props.contactHead}
          </div>
          <div className="md:w-56 grid grid-flow-col md:grid-flow-row gap-4 md:gap-3">
            {props.contacts.map((contact, idx) => (
              <div
                key={`contact-${idx}`}
                className="p-6 md:p-3 shadow-sm bg-skin-base flex flex-col md:flex-row"
              >
                <div className="mb-2 md:mb-0 md:mr-3 w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={contact.image.src}
                    alt=""
                    width={contact.image.width}
                    height={contact.image.height}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={getPlaceholderImage()}
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
  const staticData = await import("data/membersArea/becomeAMember/data.json");

  return { props: { ...staticData } };
};
