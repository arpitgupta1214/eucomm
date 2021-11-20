import Layout from "components/Layouts";
import TimelineCard from "components/Cards/TimelineCard";
import { HeadImage, Selector } from "components/ui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";
import Loader from "components/Loader/Loader";
import ListLoad from "components/ListLoad";
import TimelineEventCard from "components/Cards/TimelineEventCard";
import SocialLinks from "components/SocialLinks";

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
      if (!activePeriod) {
        return;
      }
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

      <div className="mb-10">
        <SocialLinks color round w={10} links={props.config.socialLinks} />
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

        <div className="mb-6 w-screen md:w-full">
          <ListLoad
            data={events}
            Component={({ item }) => <TimelineEventCard event={item} />}
            more={moreEvents}
            moreText={props.loadMoreText}
            loadMore={loadMoreEvents}
          />
        </div>
      </div>

      <ListLoad
        head={props.otherHead}
        data={otherTimelines}
        cols={3}
        Component={({ item }) => <TimelineCard timeline={item} />}
        more={moreTimelines}
        moreText={props.loadMoreText}
        loadMore={loadMore}
        secondary
      />
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
