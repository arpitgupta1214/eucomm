import Layout from "../components/Layouts";
import Image from "next/image";
import { Button } from "components/ui";
import getPlaceholderImage from "util/getPlaceholderImg";
import CustomIcon from "components/CustomIcon";
import ListLoad from "components/ListLoad";
import HomeCard from "components/Cards/HomeCard";
import { useState } from "react";
import Stats from "components/Stats";
import { useSelector } from "react-redux";
const Home = (props) => {
  const isMobile = useSelector((state) => state.ui.isMobile);
  const [showcaseItems, setShowcaseItems] = useState(
    props.showcaseItems.slice(0, 6)
  );
  const [moreShowcaseItems, setMoreShowcaseItems] = useState(true);
  const loadMore = () => {
    setShowcaseItems(props.showcaseItems);
    setMoreShowcaseItems(false);
  };
  return (
    <div className="flex flex-col items-center">
      {/* header */}
      <div className="mb-16 md:mb-28 w-full flex flex-col md:flex-row justify-center relative">
        <div
          className="relative md:absolute md:top-0 md:right-0 w-full md:w-1/2 md:h-full md:overflow-hidden"
          style={{ borderBottomLeftRadius: "150px" }}
        >
          <Image
            src={props.headImg.src}
            width={props.headImg.width}
            height={props.headImg.height}
            alt=""
            layout={isMobile ? "responsive" : "fill"}
            objectFit="cover"
            priority
          />
        </div>
        <div className="content-md flex pt-6 md:pt-24 md:pb-10">
          <div className="md:w-2/5 flex flex-col items-start">
            <span className="mb-3.5 font-bold text-3xl md:text-8xl leading-snug">
              {props.head}
            </span>
            <span className="md:w-3/4 mb-3.5 md:mb-7 text-sm md:text-base leading-normal">
              {props.subhead}
            </span>
            <Button text="READ MORE" dark />
          </div>
        </div>
      </div>

      <div className="mb-12 md:mb-28 w-full bg-skin-dark pt-14 md:pt-24 pb-5 md:pb-28 flex flex-col items-center">
        <div className="content-md md:flex">
          <div className="md:w-1/2 md:pr-7 flex flex-col">
            <div className="mb-6 pb-6 md:pb-7 font-bold text-2xl md:text-4xl text-white leading-tight border-b border-skin-base">
              {props.newsHead}
            </div>
            <div className="w-full flex md:flex-col overflow-x-auto">
              {props.newsItems.map((newsItem, idx) => (
                <div
                  key={`news-${idx}`}
                  className="mb-10 md:mb-6 mr-4 md:mr-0 flex flex-shrink-0 max-w-xs md:max-w-none"
                >
                  <div className="mr-5 md:mr-7 flex flex-col items-start">
                    <div className="mb-3.5 font-bold text-sm md:text-xl text-white">
                      {newsItem.head}
                    </div>
                    <div className="mb-3.5 max-line-2 text-xs md:text-sm text-white">
                      {newsItem.description}
                    </div>
                    <button className="flex text-skin-highlight text-sm md:text-base">
                      <span className="mr-2">Read More</span>
                      <CustomIcon name="BsArrowRight" />
                    </button>
                  </div>
                  <div className="flex-shrink-0 h-32 w-32 relative">
                    <Image
                      src={newsItem.image.src}
                      alt=""
                      width={newsItem.image.width}
                      height={newsItem.image.height}
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                      placeholder="blur"
                      blurDataURL={getPlaceholderImage()}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 md:pr-7 flex flex-col">
            <div className="mb-6 pb-6 md:pb-7 font-bold text-2xl md:text-4xl text-white leading-tight border-b border-skin-base">
              {props.twitterHead}
            </div>
            <div className="w-full flex md:flex-col overflow-x-auto">
              {props.newsItems.map((newsItem, idx) => (
                <div
                  key={`news-${idx}`}
                  className="mb-10 md:mb-6 mr-4 md:mr-0 flex flex-shrink-0 max-w-xs md:max-w-none"
                >
                  <div className="mr-5 md:mr-7 flex flex-col items-start">
                    <div className="mb-3.5 font-bold text-sm md:text-xl text-white">
                      {newsItem.head}
                    </div>
                    <div className="mb-3.5 max-line-2 text-xs md:text-sm text-white">
                      {newsItem.description}
                    </div>
                    <button className="flex text-skin-highlight text-sm md:text-base">
                      <span className="mr-2">Read More</span>
                      <CustomIcon name="BsArrowRight" />
                    </button>
                  </div>
                  <div className="flex-shrink-0 h-32 w-32 relative">
                    <Image
                      src={newsItem.image.src}
                      alt=""
                      width={newsItem.image.width}
                      height={newsItem.image.height}
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                      placeholder="blur"
                      blurDataURL={getPlaceholderImage()}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 md:mb-24 content-md flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:w-1/4 flex flex-col items-start">
          <span className="mb-3.5 font-bold text-2xl md:text-4xl leading-normal">
            {props.videoHead}
          </span>
          <span className="mb-7 text-skin-light text-sm md:text-base">
            {props.videoSubhead}
          </span>
          <Button text="SEE ALL VIDEOS" dark />
        </div>
        <div className="w-screen md:w-3/5 relative">
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
      </div>

      <div className="w-full mb-16 md:mb-24">
        <ListLoad
          head={props.showcaseHead}
          subhead={props.showcaseSubhead}
          data={showcaseItems}
          rows={2}
          cols={3}
          Component={({ item }) => <HomeCard item={item} />}
          more={moreShowcaseItems}
          loadMore={loadMore}
        />
      </div>

      <div className="w-full pt-10 md:pt-20 pb-10 md:pb-16 bg-skin-dark flex flex-col items-center">
        <div className="mb-6 md:mb-7 font-semibold text-white">
          {props.statsHead}
        </div>
        <Stats stats={props.stats} light />
      </div>
      <div className="mb-10 md:mb-0 w-full flex flex-col items-center md:pt-28 md:pb-24 relative">
        <div className="mb-6 md:mb-0 md:absolute w-full md:w-1/2 md:h-full md:top-0 md:right-0">
          <Image
            src={props.event.image.src}
            width={props.event.image.width}
            height={props.event.image.height}
            alt=""
            layout={isMobile ? "responsive" : "fill"}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="content-md">
          <div className="md:w-2/5 flex flex-col items-start">
            <div className="mb-3.5 font-semibold text-skin-light text-sm md:text-base">
              UPCOMING EVENTS
            </div>
            <div className="mb-3.5 font-bold text-2xl md:text-4xl">
              {props.event.head}
            </div>
            <div className="mb-3.5 text-skin-light">
              {props.event.description}
            </div>
            <div className="mb-6 md:mb-7">{props.event.location}</div>
            <Button text="READ MORE" />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.layout = Layout;
export default Home;

export const getStaticProps = async () => {
  const data = await import(`data/home/data.json`).then((data) => data.default);
  return { props: data };
};
