import Layout from "components/Layouts";
import SocialLinks from "components/SocialLinks/SocialLinks";
import { useSelector } from "react-redux";

const Contact = ({ config, ...props }) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  return (
    <div className="w-full mt-11 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-5 text-5xl font-bold">{props.pageHead}</div>

      <div className="mb-10 md:mb-28 content-md flex flex-col md:flex-row-reverse">
        {/* map */}
        <div className="mb-6 md:mb-0 h-44 md:h-auto flex-grow bg-red-200 overflow-hidden"></div>

        {/* content */}
        <div className="md:mr-28 flex-shrink-0 md:py-24 grid md:grid-cols-2 gap-y-5 md:gap-y-20 text-sm">
          <div>
            <div className="mb-4 md:mb-3 md:text-xs font-bold">
              {props.openHead}
            </div>
            <div className="text-skin-light">
              <div className="mb-2">{config.opening.days}</div>
              <div>{config.opening.time}</div>
            </div>
          </div>
          <div>
            <div className="mb-4 md:mb-3 md:text-xs font-bold">
              {props.addressHead}
            </div>
            <div className="text-skin-light">
              <div className="mb-2">{config.address.line1},</div>
              <div className="mb-2">{config.address.line2}</div>
              <div>{config.address.country}</div>
            </div>
          </div>
          <div>
            <div className="mb-4 md:mb-3 md:text-xs font-bold">
              {props.contactHead}
            </div>
            <div className="text-skin-light">
              <div className="mb-2">{config.email}</div>
              <div>{config.phone}</div>
            </div>
          </div>
          <div>
            <div className="mb-4 md:mb-3 w-full md:text-xs font-bold">
              {props.socialHead}
            </div>
            <SocialLinks
              links={config.socialLinks}
              color
              w={isMobile && 10}
              full={isMobile}
            />
          </div>
        </div>
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
