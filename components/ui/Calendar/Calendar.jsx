import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CalendarDates from "calendar-dates";
import { useEffect, useState } from "react";
const calendarDates = new CalendarDates();
import s from "./calendar.module.scss";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

const Calendar = ({ cancel, apply }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [dateMatrix, setDateMatrix] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    const getMatrix = async () => {
      const newMtrix = await calendarDates.getMatrix(
        new Date(currentYear, currentMonth)
      );
      setDateMatrix(newMtrix);
    };
    getMatrix();
  }, [currentMonth, currentYear]);

  const plusMonth = () => {
    setCurrentMonth((currentMonth) => {
      if (currentMonth === 11) {
        setCurrentYear(currentYear + 1);
        return 0;
      }
      return currentMonth + 1;
    });
  };

  const minusMonth = () => {
    setCurrentMonth((currentMonth) => {
      if (currentMonth === 0) {
        setCurrentYear(currentYear - 1);
        return 11;
      }
      return currentMonth - 1;
    });
  };

  const handleClickDate = (date) => () => {
    if (date.type !== "current") {
      return;
    }
    if (!fromDate) {
      setFromDate(date.iso);
    } else {
      if (!toDate) {
        setToDate(date.iso);
      } else {
        setFromDate(null);
        setToDate(null);
      }
    }
  };

  const canApply = fromDate && toDate;
  if (dateMatrix.length === 0) {
    return <></>;
  }
  return (
    <div
      className={`${s.calendar} flex flex-col font-base text-skin-base bg-skin-base`}
    >
      {/* month selector */}
      <div className="flex m-5 mb-3">
        <button onClick={minusMonth}>
          <BsChevronLeft />
        </button>
        <h1 className="text-xl mx-auto font-medium">{`${months[currentMonth]} ${currentYear}`}</h1>
        <button onClick={plusMonth}>
          <BsChevronRight />
        </button>
      </div>
      {/* days */}
      <div
        className="grid mx-5 mb-6"
        style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
      >
        {days.map((day) => (
          <div
            key={`day-${day}`}
            className="text-xs text-skin-light text-center p-2 mb-2"
          >
            {day}
          </div>
        ))}
        {dateMatrix
          .filter((rows) => rows.find((date) => date.type === "current"))
          .reduce((acc, curr) => {
            return [...acc, ...curr];
          }, [])
          .map((date) => (
            <div
              key={`date-${date.iso}`}
              className={`${
                fromDate && toDate && fromDate <= date.iso && date.iso <= toDate
                  ? "bg-skin-highlight bg-opacity-10"
                  : ""
              } ${fromDate === date.iso ? "rounded-l-full" : ""} 
                ${toDate === date.iso ? "rounded-r-full" : ""}`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center ${
                  date.type !== "current" ? "text-skin-light" : ""
                } ${
                  [fromDate, toDate].includes(date.iso)
                    ? "bg-skin-highlight text-white rounded-full"
                    : ""
                } `}
                onClick={handleClickDate(date)}
              >
                <span className="leading-none pt-1">{date.date}</span>
              </div>
            </div>
          ))}
      </div>

      <div className="px-6 py-4 flex border-t border-skin-base">
        <button
          className="border border-skin-highlight text-skin-highlight py-2 flex-grow"
          onClick={cancel}
        >
          Cancel
        </button>
        <button
          className={`border border-skin-highlight bg-skin-highlight text-white py-2 ml-4 flex-grow ${
            !canApply ? "opacity-60" : ""
          }`}
          onClick={() => apply(new Date(fromDate), new Date(toDate))}
          disabled={!canApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Calendar;
