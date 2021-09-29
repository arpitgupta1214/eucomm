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
      <div className="w-full max-w-content mb-32">
        <Carousel>
          {props.carouselImages.map((image, idx) => (
            <div key={`carousel-img-${idx}`} className="mr-6">
              <Image
                src={image.src}
                alt=""
                width={parseInt((image.width / image.height) * 320)}
                height={320}
                layout="fixed"
              />
            </div>
          ))}
        </Carousel>
      </div>
      {/* purpose */}
      <div className="mb-32 w-full max-w-content-small relative">
        <div className="m-14 max-w-2xl pl-7 border-l-2 border-white text-white">
          <div className="mb-3 text-sm font-bold">{props.purposeHead}</div>
          <div className="text-sm">{props.purposeText}</div>
        </div>
        <div
          className="absolute left-0 top-0 w-full h-full"
          style={{ zIndex: -1 }}
        >
          <Image
            src={props.purposeBg.src}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      {/* mission */}
      <div className="mb-32 max-w-content mx-auto flex flex-wrap justify-between items-center">
        {/* image */}
        <div className="w-1/2">
          <Image
            src={props.missionImage.src}
            alt=""
            width={props.missionImage.width}
            height={props.missionImage.height}
            layout="responsive"
          />
        </div>

        {/* content */}
        <div className="w-2/5">
          <div className="text-4xl mb-5">{props.missionHead}</div>
          <div className="text-skin-light">{props.missionText}</div>
        </div>
      </div>
      <div className="content-sm mb-32">
        <Newsletter />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const staticData = await import("data/about/whoWeAre/data.json").then(
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
