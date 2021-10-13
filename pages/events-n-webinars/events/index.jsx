import EventCard from "components/EventCard/EventCard";
import Layout from "components/Layouts";
import { Button, Selector } from "components/ui";
import { useEffect, useState } from "react";

const Events = (props) => {
  const [activeEventGroup, setActiveEventGroup] = useState(
    props.eventGroups[0]
  );
  const [events, setEvents] = useState([]);
  const [moreEvents, setMoreEvents] = useState(false);
  useEffect(() => {
    setEvents(
      props.eventGroups
        .find((eventGroup) => eventGroup.name === activeEventGroup.name)
        .events.slice(0, 6)
    );
    setMoreEvents(true);
  }, [activeEventGroup, props.eventGroups]);

  const loadMore = () => {
    setEvents(
      props.eventGroups.find(
        (eventGroup) => eventGroup.name === activeEventGroup.name
      ).events
    );
    setMoreEvents(false);
  };
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
          active={activeEventGroup.name}
          onSelect={(eventGroupName) =>
            setActiveEventGroup(
              props.eventGroups.find(
                (eventGroup) => eventGroup.name === eventGroupName
              )
            )
          }
        />
      </div>

      <div className="mb-10 md:mb-32 content-md flex flex-col items-center">
        {/* envents */}
        <div className="mb-6 w-full grid md:grid-cols-3 gap-5 md:gap-6">
          {events.map((event, idx) => {
            const [date, month, year] = event.date.split(" ");
            return (
              <EventCard
                key={`event-${idx}`}
                event={event}
                date={date}
                month={month}
                year={year}
                light
              />
            );
          })}
        </div>

        {/* load more */}
        {moreEvents && <Button text={props.loadMoreText} onClick={loadMore} />}
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
