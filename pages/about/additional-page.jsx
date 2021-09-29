import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import Image from "next/image";
import { BsCheckCircle } from "react-icons/bs";

const AdditionalPage = (props) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-7 text-5xl font-bold">{props.pageHead}</div>
      {/* overview */}
      <div className="mb-32 content-md flex items-center">
        {/* content */}
        <div className="mr-24 w-full max-w-lg">
          <div className="mb-5 text-4xl font-bold">{props.overviewHead}</div>
          <div className="text-skin-light">{props.overviewContent}</div>
        </div>
        {/* image */}
        <div className="flex-grow">
          <Image {...props.overviewImage} alt="" layout="responsive" />
        </div>
      </div>

      {/* challenges */}
      <div className="mb-32 w-full flex items-center bg-skin-light">
        <div className="w-full max-w-xl">
          <Image
            src={props.challengesImage.src}
            height={props.challengesImage.height}
            width={props.challengesImage.width}
            alt=""
            layout="responsive"
          />
        </div>

        <div className="ml-16 max-w-xl pr-5">
          <div className="mb-5 text-4xl font-bold">{props.challengesHead}</div>
          <div className="text-skin-light">
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
      </div>

      <div className="content-sm mb-32">
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
