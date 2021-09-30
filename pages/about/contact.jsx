import Layout from "components/Layouts";
import SocialLinks from "components/SocialLinks/SocialLinks";

const Contact = ({ config, ...props }) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-5 text-5xl font-bold">{props.pageHead}</div>

      <div className="mb-28 content-md flex">
        {/* content */}
        <div className="mr-28 flex-shrink-0 py-24 grid grid-cols-2 gap-y-20">
          <div>
            <div className="mb-3 text-xs font-bold">{props.openHead}</div>
            <div className="text-skin-light">
              <div className="mb-2">{config.opening.days}</div>
              <div>{config.opening.time}</div>
            </div>
          </div>
          <div>
            <div className="mb-3 text-xs font-bold">{props.addressHead}</div>
            <div className="text-skin-light">
              <div className="mb-2">{config.address.line1},</div>
              <div className="mb-2">{config.address.line2}</div>
              <div>{config.address.country}</div>
            </div>
          </div>
          <div>
            <div className="mb-3 text-xs font-bold">{props.contactHead}</div>
            <div className="text-skin-light">
              <div className="mb-2">{config.email}</div>
              <div>{config.phone}</div>
            </div>
          </div>
          <div>
            <div className="mb-3 text-xs font-bold">{props.socialHead}</div>
            <SocialLinks links={config.socialLinks} color />
          </div>
        </div>
        <div className="flex-grow bg-red-200 overflow-hidden"></div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/about/contact/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

Contact.layout = Layout;
export default Contact;
