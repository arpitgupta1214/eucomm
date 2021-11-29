import Layout from "../components/Layouts";
import Image from "next/image";
import { Button } from "components/ui";
import ListLoad from "components/ListLoad";
import { useState } from "react";
import Stats from "components/Stats";
import Newsletter from "components/Newsletter";
import HomeCard3 from "components/Cards/HomeCard3";
import NewsCard2 from "components/Cards/NewsCard2";
const Home = (props) => {
  const [showcaseItems, setShowcaseItems] = useState(
    props.showcaseItems.slice(0, 6)
  );
  const [moreShowcaseItems, setMoreShowcaseItems] = useState(true);
  const loadMore = () => {
    setShowcaseItems(props.showcaseItems);
    setMoreShowcaseItems(false);
  };

  const [newsItems, setNewsItems] = useState(props.newsItems.slice(0, 3));
  const [moreNewsItems, setMoreNewsItems] = useState(true);
  const loadMoreNews = () => {
    setNewsItems(props.newsItems);
    setMoreNewsItems(false);
  };
  return (
    <div className="flex flex-col items-center">
      {/* header */}
      <div className="mb-16 md:mb-28 relative content-md">
        <div className="w-full relative -z-10" style={{ paddingTop: "50%" }}>
          <Image
            src={props.headImg.src}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
          <div
            className="absolute w-full h-full top-0 left-0 z-10"
            style={{
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
        </div>
        <div className="absolute w-3/5 h-full top-0 left-0 flex flex-col justify-center items-start pl-24">
          <span className="mb-7 font-bold text-2xl md:text-5xl leading-snug md:leading-snug text-white">
            {props.head}
          </span>
          <Button text="Our Purpose" dark />
        </div>
      </div>

      <div className="w-full mb-14 md:mb-24">
        <ListLoad
          head={props.newsHead}
          data={newsItems}
          cols={3}
          rows={1}
          Component={({ item }) => <NewsCard2 item={item} />}
          more={moreNewsItems}
          loadMore={loadMoreNews}
        />
      </div>

      <div className="mb-24 content-md flex items-center">
        <div className="w-1/2 grid gap-6 grid-cols-2 grid-rows-2">
          {props?.policyImages.slice(0, 3).map((img, idx) => (
            <div
              key={`img-${idx}`}
              className={`relative ${idx === 0 ? "row-span-2" : ""}`}
              style={{ paddingTop: "64%" }}
            >
              <Image
                src={img.src}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          ))}
        </div>
        <div className="w-1/2 pl-16 flex flex-col items-start">
          <span className="mb-4 text-4xl font-bold leading-snug">
            {props.policyHead}
          </span>
          <span className="mb-6 leading-relaxed">
            {props.policyDescription}
          </span>
          <div className="grid grid-flow-col gap-6">
            {props?.policyButtons.map((button, idx) => (
              <Button key={`button-${idx}`} text={button.text} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full mb-16 md:mb-24">
        <ListLoad
          head={props.showcaseHead}
          data={showcaseItems}
          rows={3}
          cols={3}
          Component={({ item }) => <HomeCard3 item={item} />}
          more={moreShowcaseItems}
          loadMore={loadMore}
          secondary
        />
      </div>

      <div className="mb-24 w-full flex flex-col items-center">
        <div className="mb-6 font-bold text-4xl">{props.statsHead}</div>
        <Stats stats={props.stats} bg />
      </div>

      <div className="mb-16 md:mb-24 relative content-md flex md:justify-end">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={props.event.image.src}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          <div
            className="absolute top-0 left-0 w-full h-full z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)",
            }}
          />
        </div>
        <div className="z-10 w-screen md:w-2/5 px-4 mt-6 mb-10 md:m-16 flex flex-col items-start text-white">
          <div className="mb-4 font-bold text-2xl md:text-4xl md:leading-normal">
            {props.event.head}
          </div>
          <div className="mb-4">{props.event.description}</div>
          <Button text="READ MORE" dark />
        </div>
      </div>
      <Newsletter />
    </div>
  );
};

Home.layout = Layout;
export default Home;

export const getStaticProps = async () => {
  const data = await import(`data/home3/data.json`).then(
    (data) => data.default
  );
  return { props: data };
};
