import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CalendarDates from "calendar-dates";
import { useState } from "react";
const calendarDates = new CalendarDates();

// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const currentMonth = useState(new Date().getMonth());
  const currentYear = useState(new Date().getYear());

  calendarDates.getMatrix(new Date());
  return (
    <div className="flex flex-col">
      {/* month selector */}
      <div className="flex justify-between p-5">
        <BsChevronLeft />
        <h1 className="text-xl">{`${months[currentMonth]} ${currentYear}`}</h1>
        <BsChevronRight />
      </div>
    </div>
  );
};

export default Calendar;
