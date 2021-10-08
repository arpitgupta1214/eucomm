import CustomIcon from "components/CustomIcon/CustomIcon";
import Layout from "components/Layouts";
import { ArrowButton, Selector } from "components/ui";
import { useState } from "react";

const Events = (props) => {
  const [activeEventGroup, setActiveEventGroup] = useState(
    props.eventGroups[0]
  );
  return (
    <div className="mt-16 flex flex-col items-center">
      {/* head */}
      <div className="mb-3 font-bold text-5xl">{props.pageHead}</div>

      {/* selector */}
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

      <div className="mb-32 content-md flex flex-col items-center">
        {/* envents */}
        <div className="w-full grid grid-cols-3 gap-6">
          {activeEventGroup.events.map((event, idx) => {
            const [date, month, year] = event.date.split(" ");
            return (
              <div
                key={`event-${idx}`}
                className="py-4 px-7 bg-skin-light flex flex-col"
              >
                <div className="mb-8 flex justify-between">
                  {/* date */}
                  <div className="flex flex-col">
                    <div className="font-bold text-5xl text-skin-highlight">
                      {date}
                    </div>
                    <div className="text-xs text-skin-light">
                      {month}, {year}
                    </div>
                  </div>
                  <div className="w-12 h-12">
                    <ArrowButton direction="forward" />
                  </div>
                </div>
                <div className="grid grid-flow-row gap-3">
                  <div className="text-xl font-bold">{event.head}</div>
                  <div className="flex font-sm text-sm ">
                    <CustomIcon
                      name="AiOutlineClockCircle"
                      className="mr-2 text-skin-highlight"
                    />
                    <span className="text-skin-light">{event.time}</span>
                  </div>
                  <div className="flex font-sm text-sm">
                    <CustomIcon
                      name="HiOutlineDesktopComputer"
                      className="mr-2 text-skin-highlight"
                    />
                    <span className="text-skin-light">{event.mode}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
