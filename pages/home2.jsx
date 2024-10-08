import Layout from "../components/Layouts";
import Image from "next/image";
import { Button } from "components/ui";
import ListLoad from "components/ListLoad";
import { useState } from "react";
import Stats from "components/Stats";
import { useSelector } from "react-redux";
import NewsCard from "components/Cards/NewsCard";
import HomeCard2 from "components/Cards/HomeCard2";
import Newsletter from "components/Newsletter";
const Home = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const [showcaseItems, setShowcaseItems] = useState(
    props.showcaseItems.slice(0, 5)
  );
  const [moreShowcaseItems, setMoreShowcaseItems] = useState(true);
  const loadMore = () => {
    setShowcaseItems(props.showcaseItems);
    setMoreShowcaseItems(false);
  };

  const [newsItems, setNewsItems] = useState(props.newsItems.slice(0, 4));
  const [moreNewsItems, setMoreNewsItems] = useState(true);
  const loadMoreNews = () => {
    setNewsItems(props.newsItems);
    setMoreNewsItems(false);
  };
  return (
    <div className="flex flex-col items-center">
      {/* header */}
      <div className="mb-16 md:mb-28 w-full flex flex-col md:flex-row justify-center relative bg-skin-dark">
        <div className="absolute top-0 right-0 w-full md:w-2/5 h-full opacity-70">
          <Image
            src={props.headImg.src}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
          <div
            className="w-full h-full md:opacity-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.7) 100%)",
            }}
          />
        </div>
        <div className="z-10 content-md pt-96 pb-12 md:pt-32 md:pb-36">
          <div className="md:w-7/12 md:pr-5 flex flex-col items-start">
            <span className="mb-3.5 font-bold text-2xl md:text-5xl leading-snug md:leading-snug text-white">
              {props.head}
            </span>
            <div className="hidden md:block">
              <Button text="OUR PURPOSE" dark />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 md:mb-24 content-md flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 w-screen md:w-3/5 relative md:order-2">
          <div className="w-full" style={{ paddingTop: "56%" }}>
            <iframe
              className="absolute top-0 left-0 h-full w-full"
              src="https://www.youtube.com/embed/D0UnqGm_miA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col items-start">
          <span className="mb-3.5 font-bold text-2xl md:text-4xl leading-normal">
            {props.videoHead}
          </span>
          <span className="mb-7 text-skin-light text-sm md:text-base">
            {props.videoSubhead}
          </span>
          <Button text="SEE ALL VIDEOS" dark />
        </div>
      </div>

      <div className="mb-24 content-md flex flex-col items-center md:flex-row md:items-stretch">
        <div className="w-screen md:w-1/2 flex-shrink-0">
          <Image
            src={props.joinImg.src}
            width={props.joinImg.width}
            height={props.joinImg.height}
            alt=""
            layout="responsive"
          />
        </div>
        <div className="w-screen md:w-auto pt-6 md:pt-16 pb-10 md:pb-20 px-4 md:pl-16 bg-skin-light">
          <div className="flex flex-col items-start w-full md:w-4/5">
            <span className="mb-3.5 text-3xl font-bold">{props.joinHead}</span>
            <span className="mb-7 text-skin-light">{props.joinSubhead}</span>
            <Button text={props.joinButtonText} dark />
          </div>
        </div>
      </div>

      <div className="w-full mb-14 md:mb-24">
        <ListLoad
          head={props.newsHead}
          data={newsItems}
          cols={4}
          rows={1}
          Component={({ item }) => <NewsCard item={item} />}
          more={moreNewsItems}
          loadMore={loadMoreNews}
        />
      </div>

      <div className="mb-24 w-full pt-10 md:pt-20 pb-10 md:pb-16 bg-skin-dark flex flex-col items-center">
        <div className="mb-6 md:mb-7 font-semibold text-white">
          {props.statsHead}
        </div>
        <Stats stats={props.stats} light />
      </div>

      <div className="w-full mb-16 md:mb-24">
        <ListLoad
          head={props.showcaseHead}
          subhead={props.showcaseSubhead}
          data={showcaseItems}
          rows={3}
          cols={4}
          Component={({ item }) => <HomeCard2 item={item} />}
          more={moreShowcaseItems}
          loadMore={loadMore}
          mosaic
        />
      </div>

      <div className="mb-16 md:mb-24 content-md flex flex-col items-center md:items-stretch md:flex-row">
        <div className="w-screen md:w-1/2 relative">
          <Image
            src={props.event.image.src}
            width={isMobile ? props.event.image.width : undefined}
            height={isMobile ? props.event.image.height : undefined}
            alt=""
            layout={isMobile ? "responsive" : "fill"}
            objectFit="cover"
            objectPosition="center"
          />
          <div className="absolute top-0 left-0 w-full h-full z-10 p-16 flex flex-col justify-center items-start bg-black bg-opacity-60">
            <div className="mb-3.5 font-semibold text-skin-light text-sm md:text-base">
              UPCOMING EVENTS
            </div>
            <div className="mb-3.5 md:w-3/5 font-bold text-2xl md:text-5xl md:leading-normal text-white">
              {props.event.head}
            </div>
          </div>
        </div>
        <div className="w-screen md:w-1/2 bg-skin-light px-4 pt-6 pb-10 md:p-16 flex flex-col items-start">
          <div className="mb-3.5 font-bold text-2xl">
            {props.event.subtitle}
          </div>
          <div className="mb-3.5 text-skin-light">
            {props.event.description}
          </div>
          <div className="mb-6 md:mb-7">{props.event.location}</div>
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
  const data = await import(`data/home2/data.json`).then(
    (data) => data.default
  );
  return { props: data };
};
