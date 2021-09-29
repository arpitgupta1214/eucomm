import Layout from "components/Layouts";
import SocialLinks from "components/SocialLinks/SocialLinks";

const Contact = ({ config, ...props }) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-5 text-5xl font-bold">{props.pageHead}</div>

      <div className="mb-28 content-md flex">
        <div className="mr-9 flex-shrink-0 py-24 px-20 grid grid-cols-2 gap-14">
          <div>
            <div className="mb-3 text-xs font-bold text-skin-light">
              {props.openHead}
            </div>
            <div className="mb-2">{config.opening.days}</div>
            <div>{config.opening.time}</div>
          </div>
          <div>
            <div className="mb-3 text-xs font-bold text-skin-light">
              {props.addressHead}
            </div>
            <div className="mb-2">{config.address.line1},</div>
            <div className="mb-2">{config.address.line2}</div>
            <div>{config.address.country}</div>
          </div>
          <div>
            <div className="mb-3 text-xs font-bold text-skin-light">
              {props.contactHead}
            </div>
            <div className="mb-2">{config.email}</div>
            <div>{config.phone}</div>
          </div>
          <div>
            <div className="mb-3 text-xs font-bold text-skin-light">
              {props.socialHead}
            </div>
            <SocialLinks links={config.socialLinks} />
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
