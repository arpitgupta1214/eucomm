import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import { Carousel } from "components/ui";
import Image from "next/image";

const WhoWeAre = (props) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 text-5xl font-bold">{props.pageHead}</div>
      {/* carousel */}
      <div className="w-full pl-32 mb-24">
        <Carousel images={props.carouselImages} />
      </div>
      {/* purpose */}
      <div className="w-full mb-32 px-5 bg-skin-light">
        <div className="max-w-3xl mx-auto py-24">
          <div className="mb-3 text-sm font-bold">{props.purposeHead}</div>
          <div className="text-sm text-skin-light">{props.purposeText}</div>
        </div>
      </div>
      {/* mission */}
      <div className="mb-32 max-w-content mx-auto flex flex-wrap justify-between items-center">
        {/* content */}
        <div className="w-2/5">
          <div className="text-4xl mb-5">{props.missionHead}</div>
          <div className="text-skin-light">{props.missionText}</div>
        </div>
        {/* image */}
        <div className="w-1/2">
          <Image
            src={props.missionImage}
            alt=""
            width={573}
            height={387}
            layout="responsive"
          />
        </div>
      </div>
      <div className="w-full max-w-content mb-32 rounded-xl overflow-hidden">
        <Newsletter />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/about/who-we-are/data.json").then(
    (data) => data.default
  );

  return {
    props: {
      ...staticData,
    },
  };
};

WhoWeAre.layout = Layout;
export default WhoWeAre;
