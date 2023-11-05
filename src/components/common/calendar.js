'use client';
import React, { useState } from 'react';

export const CalendarComponent = ({ styleCal, handleDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const getPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const currentYear = new Date().getFullYear();
    const currentMonthNumber = new Date().getMonth();
    if (
      previousMonth.getFullYear() > currentYear ||
      previousMonth.getMonth() >= currentMonthNumber
    ) {
      setCurrentMonth(previousMonth);
    }
  };

  const getMonthName = (date) => {
    if (typeof window !== 'undefined') {
      const options = { month: 'long' };
      return date.toLocaleDateString(navigator.language, options);
    }
    return '';
  };

  const getYear = (date) => {
    return date.getFullYear();
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const getCalendarData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = new Date(year, month - 1, 1).getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return { month: getMonthName(currentMonth), year: getYear(currentMonth), days: calendarDays };
  };

  const { month, year, days } = getCalendarData();

  const isCurrentDate = (day) => {
    const today = new Date();
    return (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear() &&
      day === today.getDate()
    );
  };

  const handleDateClick = (day, idx) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    console.log(date,"date")
    setSelectedDate(idx);
    handleDateChange(date);
  };

  const padStartWithZero = (number) => {
    return number?.toString().padStart(2, '0');
  };

  return (
    <div
      className={`container mx-auto w-full md:w-[15rem]
    ${styleCal} bg-white px-4 pt-2 pb-4`}
    >
      <div className="flex justify-between items-center bg-red mb-1">
        <h3 className="text-base mb-4 font-semibold">{month}</h3>
        <div className="gap-1 hidden">
          <button className="font-bold py-2 " onClick={getPreviousMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 inline-block"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="font-bold py-2 " onClick={getNextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 inline-block"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 cursor-pointer">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayName,idx) => (
          <div
            key={idx}
            className="font-semibold text-gray-400 text-[0.67rem] text-center py-2"
          >
            {dayName}
          </div>
        ))}
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`py-1 ease-in-out ${
              day
                ? isCurrentDate(day)
                  ? 'bg-main text-white'
                  : selectedDate === idx
                  ? 'ring'
                  : ''
                : ''
            } text-[0.65rem] text-center font-medium border-gray-200 hover:ring rounded-full transition-all duration-300`}
            onClick={() => handleDateClick(day, idx)}
          >
            {padStartWithZero(day)}
          </div>
        ))}
      </div>
    </div>
  );
};
