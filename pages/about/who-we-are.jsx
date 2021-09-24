import Layout from "components/Layouts";
import { Carousel } from "components/ui";

const WhoWeAre = (props) => {
  return (
    <div className="w-full mt-16 flex flex-col items-center">
      <div className="mb-6 text-5xl font-bold">{props.carouselHead}</div>
      <div className="w-full pl-32 mb-24">
        <Carousel images={props.carouselImages} />
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
