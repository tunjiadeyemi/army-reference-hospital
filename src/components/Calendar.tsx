import React, { useState } from 'react';

interface CalendarProps {
  initialDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const Calendar: React.FC<CalendarProps> = ({ initialDate, onDateSelect }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    initialDate ? initialDate.getMonth() : today.getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    initialDate ? initialDate.getFullYear() : today.getFullYear()
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [];

  // Previous month's trailing days
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      date: new Date(prevYear, prevMonth, prevMonthDays - i)
    });
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(currentYear, currentMonth, day)
    });
  }

  // Next month's leading days
  const remainingCells = 42 - calendarDays.length;
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(nextYear, nextMonth, day)
    });
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleDateClick = (dateObj: { day: number; isCurrentMonth: boolean; date: Date }) => {
    setSelectedDate(dateObj.date);
    if (onDateSelect) onDateSelect(dateObj.date);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-full w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          className="px-2 py-1 text-gray-500 hover:text-gray-700"
          onClick={handlePrevMonth}
          aria-label="Previous Month"
        >
          &lt;
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {months[currentMonth]} {currentYear}
        </h3>
        <button
          className="px-2 py-1 text-gray-500 hover:text-gray-700"
          onClick={handleNextMonth}
          aria-label="Next Month"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dateObj, index) => {
          const isToday =
            dateObj.date.getDate() === today.getDate() &&
            dateObj.date.getMonth() === today.getMonth() &&
            dateObj.date.getFullYear() === today.getFullYear();
          const isSelected =
            selectedDate &&
            dateObj.date.getDate() === selectedDate.getDate() &&
            dateObj.date.getMonth() === selectedDate.getMonth() &&
            dateObj.date.getFullYear() === selectedDate.getFullYear();
          return (
            <div
              key={index}
              className={`
                text-center py-2 text-sm cursor-pointer rounded-md
                ${!dateObj.isCurrentMonth ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}
                ${isToday ? 'border-2 border-teal-500' : ''}
                ${isSelected ? 'bg-teal-500 text-white hover:bg-teal-600' : ''}
              `}
              onClick={() => handleDateClick(dateObj)}
            >
              {dateObj.day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
