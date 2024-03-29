import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import Image from "next/image";
import { BsCheckCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import getPlaceholderImage from "util/getPlaceholderImg";

const AdditionalPage = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>
      {/* overview */}
      <div className="mb-10 md:mb-32 content-md flex flex-col md:flex-row md:items-center">
        {/* content */}
        <div className="mr-24 w-full max-w-lg">
          <div className="mb-4 md:mb-5 text-2xl md:text-4xl font-bold">
            {props.overviewHead}
          </div>
          <div className="mb-6 md:mb-0 text-sm md:text-base text-skin-light">
            {props.overviewContent}
          </div>
        </div>
        {/* image */}
        <div className="flex-grow">
          <Image
            {...props.overviewImage}
            alt=""
            layout="responsive"
            priority={true}
            placeholder="blur"
            blurDataURL={getPlaceholderImage()}
          />
        </div>
      </div>

      {/* challenges */}
      <div className="mb-10 md:mb-32 w-full flex flex-col md:flex-row-reverse md:justify-end md:items-center bg-skin-light py-10 px-4 md:p-0">
        {/* content */}
        <div className="md:ml-16 max-w-xl pr-5">
          <div className="mb-3 md:mb-5 text-2xl md:text-4xl font-bold">
            {props.challengesHead}
          </div>
          <div className="text-sm md:text-base text-skin-light">
            {props.challenges.map((challenge, idx) => (
              <div key={`challenge-${idx}`} className="mb-3 flex">
                <div className="w-5 h-5 flex-shrink-0 mr-3 text-skin-highlight">
                  <BsCheckCircle className="w-full h-full" />
                </div>
                <div className="text-skin-light">{challenge}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-xl">
          <Image
            src={props.challengesImage.src}
            height={props.challengesImage.height}
            width={props.challengesImage.width}
            alt=""
            layout="responsive"
            placeholder="blur"
            blurDataURL={getPlaceholderImage()}
          />
        </div>
      </div>

      <div className={`mb-3 md:mb-32 ${!isMobile ? "content-sm" : ""}`}>
        <Newsletter />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/about/additionalPage/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

AdditionalPage.layout = Layout;
export default AdditionalPage;
