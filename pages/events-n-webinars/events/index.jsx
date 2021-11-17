import EventCard from "components/Cards/EventCard";
import Layout from "components/Layouts";
import ListLoad from "components/ListLoad";
import Loader from "components/Loader";
import { Selector } from "components/ui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "store/searchSlice";

const Events = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const activeTab = useSelector((state) => state.search.tab);
  useEffect(() => {
    dispatch(searchActions.setTab({ tab: props.eventGroups[0].name }));
  }, [dispatch, props.eventGroups]);

  const [activeEventGroup, setActiveEventGroup] = useState(null);
  const [events, setEvents] = useState([]);
  const [moreEvents, setMoreEvents] = useState(false);

  useEffect(() => {
    if (activeTab) {
      const activeEventGroup = props.eventGroups.find(
        (eventGroup) => eventGroup.name === activeTab
      );
      if (!activeEventGroup) {
        return;
      }
      setActiveEventGroup(activeEventGroup);
      setEvents(activeEventGroup.events.slice(0, 6));
      setMoreEvents(true);
    }
  }, [activeTab, props.eventGroups]);

  const loadMore = () => {
    setEvents(
      props.eventGroups.find(
        (eventGroup) => eventGroup.name === activeEventGroup.name
      ).events
    );
    setMoreEvents(false);
  };

  useEffect(() => {
    if (activeEventGroup) {
      setLoading(false);
    }
  }, [activeEventGroup]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mt-10 md:mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-6 content-md text-3xl md:text-5xl font-bold md:text-center">
        {props.pageHead}
      </div>

      {/* selector */}
      <div className="mb-6 content-md flex md:justify-center">
        <Selector
          options={props.eventGroups.map((eventGroup) => eventGroup.name)}
        />
      </div>

      <div className="mb-10 md:mb-32 content-md">
        <ListLoad
          data={events}
          cols={3}
          Component={({ item: event }) => {
            const [date, month, year] = event.date.split(" ");
            return (
              <EventCard
                event={event}
                date={date}
                month={month}
                year={year}
                light
              />
            );
          }}
          more={moreEvents}
          moreText={props.loadMoreText}
          loadMore={loadMore}
        />
      </div>
    </div>
  );
};

Events.layout = Layout;
export default Events;

export const getStaticProps = async () => {
  const staticData = await import("data/events/data.json");
  return { props: { ...staticData } };
};
