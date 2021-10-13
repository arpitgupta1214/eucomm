import CustomIcon from "components/CustomIcon";
import EventCard from "components/EventCard";
import Layout from "components/Layouts";
import { Button } from "components/ui";
import Image from "next/image";
import { useEffect, useState } from "react";

const Event = (props) => {
  const [otherEvents, setOtherEvents] = useState([]);
  const [moreEvents, setMoreEvents] = useState(false);
  useEffect(() => {
    setOtherEvents(props.otherEvents.slice(0, 3));
    setMoreEvents(true);
  }, [props.otherEvents]);

  const loadMore = () => {
    setOtherEvents(props.otherEvents);
    setMoreEvents(false);
  };
  const [date, month, year] = props.date.split(" ");

  return (
    <div className="mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-3 max-w-2xl text-center font-bold text-5xl leading-normal">
        {props.pageHead}
      </div>

      {/* headimg */}
      <div className="mb-10 w-full">
        <Image
          src={props.headImage.src}
          alt=""
          width={props.headImage.width}
          height={props.headImage.height}
        />
      </div>

      <div className="mb-32 content-md flex">
        <div className="w-full flex-shrink overflow-hidden mr-8">
          {/* description */}
          <div className="mb-4 font-bold text-2xl">{props.descriptionHead}</div>
          <div className="mb-12 grid grid-flow-row gap-4">
            {props.description.split("\n").map((line, idx) => (
              <div
                key={`line-${idx}`}
                className="w-full text-lg text-skin-light text-justify"
              >
                {line}
              </div>
            ))}
          </div>
          {/* speakers */}
          <div className="mb-4 font-bold text-2xl">{props.speakersHead}</div>
          <div className="mb-12 w-full flex flex-wrap">
            {props.speakers.map((speaker, idx) => (
              <div key={`speaker-${idx}`} className="mr-5 w-52">
                <div className="mb-4 w-full">
                  <Image
                    src={speaker.image.src}
                    alt=""
                    width={speaker.image.width}
                    height={speaker.image.height}
                    layout="responsive"
                  />
                </div>
                <div className="mb-1 font-bold text-xl">{speaker.name}</div>
                <div className="text-xs text-skin-light">{speaker.title}</div>
              </div>
            ))}
          </div>

          {/* agenda */}
          <div className="mb-5 font-bold text-2xl">{props.agendaHead}</div>
          <div className="w-full p-7 pl-0 bg-skin-light flex">
            <div className="px-16 py-10 border-r border-skin-base">
              <div className="font-bold text-5xl text-skin-highlight">
                {date}
              </div>
              <div className="mb-3 text-xs text-skin-light">
                {month}, {year}
              </div>
            </div>
            <div className="pl-8">
              {props.agenda.map((slot, idx) => (
                <div key={`slot-${idx}`} className="mb-5 flex">
                  <div className="mr-6 text-sm font-bold text-skin-light whitespace-nowrap">
                    {slot.time}
                  </div>
                  <div>
                    <div className="mb-1 font-bold">{slot.head}</div>
                    <div className="text-sm text-skin-light">
                      {slot.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* details */}
        <div className="w-80 self-start py-4 px-5 bg-skin-light">
          <div className="mb-3 text-xs text-skin-light">
            {props.detailsHead}
          </div>
          <div className="font-bold text-5xl text-skin-highlight">{date}</div>
          <div className="mb-3 text-xs text-skin-light">
            {month}, {year}
          </div>
          <div className="mb-3 flex font-sm text-sm ">
            <CustomIcon
              name="AiOutlineClockCircle"
              className="mr-2 text-skin-highlight"
            />
            <span className="text-skin-light">{props.time}</span>
          </div>
          <div className="mb-3 flex font-sm text-sm">
            <CustomIcon
              name="HiOutlineDesktopComputer"
              className="mr-2 text-skin-highlight"
            />
            <span className="text-skin-light">{props.mode}</span>
          </div>
          <button className="w-full p-3 text-center bg-skin-highlight text-white font-medium">
            {props.registerText}
          </button>
        </div>
      </div>

      {/* other events */}
      <div className="w-full py-32 bg-skin-light flex flex-col items-center">
        <div className="mb-4 font-bold text-4xl">{props.otherEventsHead}</div>
        <div className="content-md flex flex-col items-center">
          <div className="mb-6 w-full grid grid-cols-3 gap-6">
            {otherEvents.map((otherEvent, idx) => {
              const [date, month, year] = otherEvent.date.split(" ");
              return (
                <EventCard
                  key={`other-event-${idx}`}
                  event={otherEvent}
                  date={date}
                  month={month}
                  year={year}
                />
              );
            })}
          </div>
          {/* load more */}
          {moreEvents && (
            <Button text={props.loadMoreText} onClick={loadMore} />
          )}
        </div>
      </div>
    </div>
  );
};

Event.layout = Layout;
export default Event;

export const getStaticPaths = async () => {
  const events = [];
  const context = require.context(
    "data/events/details",
    true,
    /^\.\/.+\/.+\.json$/
  );
  context.keys().forEach((key) => {
    const resource = require(`data/events/details/${key.slice(2)}`);
    events.push(JSON.parse(JSON.stringify(resource)));
  });
  return {
    paths: events.map((event) => ({
      params: { event: event.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { event: eventSlug } = params;
  const events = [];
  const context = require.context(
    "data/events/details",
    true,
    /^\.\/.+\/.+\.json$/
  );
  context.keys().forEach((key) => {
    const resource = require(`data/events/details/${key.slice(2)}`);
    events.push(JSON.parse(JSON.stringify(resource)));
  });

  const staticData = events.find((event) => event.slug === eventSlug);

  const otherEvents = await import("data/events/data").then(
    (data) => data.eventGroups[0].events
  );
  return { props: { ...staticData, otherEvents } };
};
