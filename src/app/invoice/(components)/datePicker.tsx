// components/DatePicker.tsx
import { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parse } from "date-fns";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateInternal, setSelectedDateInternal] = useState(selectedDate);

  useEffect(() => {
    setSelectedDateInternal(selectedDate);
  }, [selectedDate]);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          {/* <ChevronLeftIcon className="h-5 w-5" /> */}
        </button>
        <div>
          <span className="text-lg font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </span>
        </div>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          {/* <ChevronRightIcon className="h-5 w-5" /> */}
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];

    let day = startDate;

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center" key={i}>
          {format(addDays(day, i), "EEE")}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            className={`text-center p-2 cursor-pointer ${
              !isSameMonth(day, currentMonth)
                ? "text-gray-400"
                : isSameDay(day, selectedDateInternal)
                ? "bg-blue-500 text-white"
                : ""
            }`}
            key={day.toString()}
            onClick={() => onDateClick(parse(cloneDay.toISOString()))}
          >
            <span>{format(day, "d")}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDateInternal(day);
    onDateChange(day);
  };

  return (
    <div className="w-64 p-4 bg-white shadow-lg rounded-lg">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default DatePicker;
