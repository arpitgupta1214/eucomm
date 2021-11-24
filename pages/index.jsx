import Layout from "../components/Layouts";
import Image from "next/image";
import { Button } from "components/ui";
import getPlaceholderImage from "util/getPlaceholderImg";
import CustomIcon from "components/CustomIcon";
import ListLoad from "components/ListLoad";
import HomeCard from "components/Cards/HomeCard";
import { useState } from "react";
import Stats from "components/Stats";
const Home = (props) => {
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
      <div className="mb-28 w-full flex justify-center relative">
        <div className="content-md flex pt-24 pb-10">
          <div className="w-2/5 flex flex-col items-start">
            <span className="mb-3.5 font-bold text-8xl leading-snug">
              {props.head}
            </span>
            <span className="w-3/4 mb-7 leading-normal">{props.subhead}</span>
            <Button text="READ MORE" dark />
          </div>
        </div>
        <div
          className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
          style={{ borderBottomLeftRadius: "150px" }}
        >
          <Image
            src={props.headImg.src}
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      <div className="mb-28 w-full bg-skin-dark pt-24 pb-28 flex flex-col items-center">
        <div className="content-md flex">
          <div className="w-1/2 pr-7 flex flex-col">
            <div className="mb-6 pb-7 font-bold text-4xl text-white leading-tight border-b border-skin-base">
              {props.newsHead}
            </div>
            <div className="w-full flex flex-col">
              {props.newsItems.map((newsItem, idx) => (
                <div key={`news-${idx}`} className="mb-6 flex">
                  <div className="mr-7 flex flex-col items-start">
                    <div className="mb-3 font-bold text-xl text-white">
                      {newsItem.head}
                    </div>
                    <div className="mb-3 max-line-2 text-sm text-white">
                      {newsItem.description}
                    </div>
                    <button className="flex text-skin-highlight">
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
          <div className="w-1/2 pl-7 flex flex-col">
            <div className="mb-6 pb-7 font-bold text-4xl text-white leading-tight border-b border-skin-base">
              {props.twitterHead}
            </div>
            <div className="w-full flex flex-col">
              {props.newsItems.map((newsItem, idx) => (
                <div key={`news-${idx}`} className="mb-6 flex">
                  <div className="mr-7 flex flex-col items-start">
                    <div className="mb-3 font-bold text-xl text-white">
                      {newsItem.head}
                    </div>
                    <div className="mb-3 max-line-2 text-sm text-white">
                      {newsItem.description}
                    </div>
                    <button className="flex text-skin-highlight">
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

      <div className="mb-24 content-md flex justify-between items-center">
        <div className="w-1/4 flex flex-col items-start">
          <span className="mb-3.5 font-bold text-4xl leading-normal">
            {props.videoHead}
          </span>
          <span className="mb-7 text-skin-light">{props.videoSubhead}</span>
          <Button text="SEE ALL VIDEOS" dark />
        </div>
        <div className="w-3/5">
          <Image
            src={props.videoImg.src}
            alt=""
            width={props.videoImg.width}
            height={props.videoImg.height}
            layout="responsive"
            eager
          />
        </div>
      </div>

      <div className="w-full mb-24">
        <ListLoad
          head={props.showcaseHead}
          subhead={props.showcaseSubhead}
          data={showcaseItems}
          cols={3}
          Component={({ item }) => <HomeCard item={item} />}
          more={moreShowcaseItems}
          loadMore={loadMore}
        />
      </div>

      <div className="w-full pt-20 pb-16 bg-skin-dark flex flex-col items-center">
        <div className="mb-7 font-semibold">{props.statsHead}</div>
        <Stats stats={props.stats} light />
      </div>
      <div className="w-full flex flex-col items-center pt-28 pb-24 relative">
        <div className="content-md">
          <div className="w-2/5 flex flex-col items-start">
            <div className="mb-3.5 font-semibold text-skin-light">
              UPCOMING EVENTS
            </div>
            <div className="mb-3.5 font-bold text-4xl">{props.event.head}</div>
            <div className="mb-3.5 text-skin-light">{props.event.subhead}</div>
            <div className="mb-7">{props.event.location}</div>
            <Button text="READ MORE" />
          </div>
        </div>
        <div className="absolute w-1/2 h-full top-0 right-0">
          <Image
            src={props.event.image.src}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
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
