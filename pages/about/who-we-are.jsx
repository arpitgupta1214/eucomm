import Layout from "components/Layouts";
import Newsletter from "components/Newsletter";
import { Carousel } from "components/ui";
import Image from "next/image";
import { useSelector } from "react-redux";
import getPlaceholderImage from "util/getPlaceholderImg";

const WhoWeAre = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  return (
    <div className="w-full mt-11 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>
      {/* carousel */}
      <div className={`${!isMobile ? "content-md" : ""} mb-10 md:mb-32`}>
        <Carousel>
          {props.carouselImages.map((image, idx) => {
            let width, height;
            if (isMobile) {
              width = image.width;
              height = image.height;
            } else {
              width = parseInt((image.width / image.height) * 320);
              height = 320;
            }
            return (
              <div
                key={`carousel-img-${idx}`}
                className="md:mr-6 w-screen md:w-auto"
              >
                <Image
                  src={image.src}
                  alt=""
                  width={width}
                  height={height}
                  layout={isMobile ? "responsive" : "fixed"}
                  priority={true}
                  placeholder="blur"
                  blurDataURL={getPlaceholderImage()}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      {/* purpose */}
      <div
        className={`mb-10 md:mb-32 ${!isMobile ? "content-sm" : ""}  relative`}
      >
        <div className="mx-6 my-10 md:m-14 max-w-2xl pl-4 md:pl-7 border-l-4 md:border-l-2 border-white text-white">
          <div className="mb-2 text-xs md:text-sm font-bold">
            {props.purposeHead}
          </div>
          <div className="text-sm opacity-70">{props.purposeText}</div>
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
            objectPosition="right"
            placeholder="blur"
            blurDataURL={getPlaceholderImage()}
          />
        </div>
      </div>
      {/* mission */}
      <div className="md-10 md:mb-32 content-md flex flex-col md:flex-row-reverse justify-between items-center">
        {/* content */}
        <div className="mb-8 md:mb-0 md:w-2/5">
          <div className="text-4xl mb-5">{props.missionHead}</div>
          <div className="text-skin-light">{props.missionText}</div>
        </div>
        {/* image */}
        <div className="mb-10 md:mb-0 w-full md:w-1/2">
          <Image
            src={props.missionImage.src}
            alt=""
            width={props.missionImage.width}
            height={props.missionImage.height}
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
