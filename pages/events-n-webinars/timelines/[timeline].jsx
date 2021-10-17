import Layout from "components/Layouts";
import TimelineCard from "components/Cards/TimelineCard";
import { Button, HeadImage, Selector } from "components/ui";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";
import Loader from "components/Loader/Loader";

const Timeline = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const activeTab = useSelector((state) => state.search.tab);
  useEffect(() => {
    dispatch(searchActions.setTab({ tab: props.periods[0].name }));
  }, [dispatch, props.periods]);

  const [activePeriod, setActivePeriod] = useState(null);
  const [events, setEvents] = useState([]);
  const [moreEvents, setMoreEvents] = useState(true);

  useEffect(() => {
    if (activeTab) {
      const activePeriod = props.periods.find(
        (period) => period.name === activeTab
      );
      setActivePeriod(activePeriod);
      setEvents(activePeriod.events.slice(0, 2));
      setMoreEvents(true);
    }
  }, [activeTab, props.periods]);

  // cut loading

  useEffect(() => {
    if (activePeriod) {
      setLoading(false);
    }
  }, [activePeriod]);
  const loadMoreEvents = () => {
    setEvents(activePeriod.events);
    setMoreEvents(false);
  };

  const [otherTimelines, setOtherTimelines] = useState(
    props.otherTimelines.slice(0, 3)
  );
  const [moreTimelines, setMoreTimelines] = useState(true);
  const loadMore = () => {
    setOtherTimelines(props.otherTimelines);
    setMoreTimelines(false);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mt-10 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 mx-4 max-w-2xl text-3xl md:text-5xl font-bold md:text-center md:leading-normal">
        {props.pageHead}
      </div>

      {/* headimg */}
      <HeadImage src={props.headImage.src} />

      {/* events */}
      <div className="mb-10 md:mb-32 content-md flex flex-col items-center">
        {/* selector */}
        <div className="mb-8">
          <Selector options={props.periods.map((period) => period.name)} />
        </div>
        {/* period */}
        <div className="mb-3 self-start font-bold text-xl md:text-4xl leading-tight">
          {activePeriod.name}
        </div>
        {/* head */}
        <div className="mb-3 self-start font-bold text-lg md:text-2xl leading-normal">
          {activePeriod.head}
        </div>

        {/* event count */}
        <div className="mb-6 md:mb-8 self-start text-skin-light text-sm leading-normal">
          {activePeriod.events.length} events
        </div>

        <div className="mb-6 w-screen md:w-full grid gap-6">
          {events.map((event, idx) => (
            <div
              key={`event-${idx}`}
              className="py-10 px-5 md:p-8 flex flex-col md:flex-row bg-skin-light"
            >
              <div className="flex-grow mr-4">
                {/* event head */}
                <div className="mb-4 font-bold text-2xl leading-normal">
                  {event.head}
                </div>

                {/* event date */}
                <div className="mb-4 text-skin-light text-sm leading-normal">
                  {event.date}
                </div>

                <div className="mb-4 text-skin-light text-sm md:text-lg leading-relaxed">
                  {event.content}
                </div>
              </div>
              <div className="flex-shrink-0 w-full md:max-w-xs">
                <Image
                  src={event.image.src}
                  alt=""
                  width={event.image.width}
                  height={event.image.height}
                  layout="responsive"
                />
              </div>
            </div>
          ))}
        </div>
        {/* load more events*/}
        {moreEvents && (
          <Button text={props.loadMoreText} onClick={loadMoreEvents} />
        )}
      </div>

      {/* other timelines */}
      <div className="w-full py-10 md:py-32 bg-skin-light flex flex-col items-center">
        <div className="mb-4 md:mb-10 font-bold text-2xl md:text-4xl content-md md:text-center">
          {props.otherHead}
        </div>
        <div className="content-md flex flex-col items-center">
          <div className="mb-6 w-full grid md:grid-cols-3 gap-6">
            {otherTimelines.map((timeline, idx) => {
              return (
                <TimelineCard
                  key={`other-timeline-${idx}`}
                  timeline={timeline}
                />
              );
            })}
          </div>
          {/* load more */}
          {moreTimelines && (
            <Button text={props.loadMoreText} onClick={loadMore} />
          )}
        </div>
      </div>
    </div>
  );
};

Timeline.layout = Layout;
export default Timeline;

export const getStaticPaths = async () => {
  const timelines = [];
  const context = require.context("data/timelines", true, /^\.\/.+\/.+\.json$/);
  context.keys().forEach((key) => {
    const resource = require(`data/timelines/${key.slice(2)}`);
    timelines.push(JSON.parse(JSON.stringify(resource)));
  });
  return {
    paths: timelines.map((timeline) => ({
      params: { timeline: timeline.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { timeline: timelineSlug } = params;
  const timelines = [];
  const context = require.context(
    "data/timelines/",
    true,
    /^\.\/.+\/.+\.json$/
  );
  context.keys().forEach((key) => {
    const resource = require(`data/timelines/${key.slice(2)}`);
    timelines.push(JSON.parse(JSON.stringify(resource)));
  });

  const staticData = timelines.find(
    (timeline) => timeline.slug === timelineSlug
  );

  const commonData = await import(`data/timelines/data.json`);
  commonData.otherTimelines = commonData.timelines.filter(
    (timeline) => timeline.slug !== timelineSlug
  );
  return { props: { ...commonData, ...staticData } };
};
