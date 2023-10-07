'use client';

import React, { useState } from 'react';
import { CalendarComponent } from '@/components';
import Image from 'next/image';
import TimePicker from 'react-time-picker';

export const BookAppointment = ({ setAppointment }) => {
  // State for the radio button
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle radio button change
  const handleInputChange = () => {
    setIsChecked(!isChecked);
  };

  const [time, setTime] = useState('');

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div className="fixed z-[3000] top-0 left-0 bottom-0 backdrop-blur-sm h-screen w-screen flex items-center justify-center">
      <div className="max-h-[80vh] overflow-y-scroll">
        <div className="bg-white px-6 w-full md:w-fit py-4 rounded-md  shadow-md">
          <h1 className="font-semibold text-xl md:text-2xl mb-2">Book Appointment</h1>
          <MessageToExpert />
          <TimeSlot
            time={time}
            handleChange={handleChange}
            isChecked={isChecked}
            handleInputChange={handleInputChange}
          />
          <div className="flex flex-col items-center= mt-2">
            <button className="py-1 mt-2 bg-white flex items-center justify-center gap-2 rounded-md w-full border-2 border-black">
              <Image src={'/svgs/Calendar.svg'} alt="calendar" width={20} height={20} />
              <span className="md:block hidden">Book Appointment</span>
            </button>
            <button
              onClick={() => setAppointment(false)}
              className="text-center mt-4 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageToExpert = () => {
  return (
    <div className="flex flex-col gap-2">
      <label className="mb-2 text-base font-semibold">Message to Expert</label>
      <textarea
        className="w-full text-sm shadow-inner resize-none focus:outline-none border-none p-2 bg-gray-50"
        placeholder="Write a Message..."
        rows={4}
        cols={4}
        typeof="text"
      />
    </div>
  );
};

const TimeSlot = ({ handleChange }) => {
  const [time, setTime] = useState('00:00'); // Default time
  const [duration, setDuration] = useState(''); // Duration in minutes
  const [checkedTime, setCheckedTime] = useState('AM');

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  return (
    <div>
      <h1 className="mt-2 font-medium mb-4">Timeslot</h1>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        {/* Calendar */}
        {/* Include your CalendarComponent here */}
        <CalendarComponent />
        <div className="flex md:flex-col gap-2">
          <div className="w-full">
            <div className="flex flex-col w-20">
              <label>TIME:</label>
              <TimePicker
                disableClock
                clearIcon={null}
                format="hh:mm A"
                className={'px-4 focus:outline-none border rounded-md bg-gray-50'}
                placeholder="Select time"
                value={time}
                onChange={handleTimeChange}
              />
            </div>
            <div className="flex gap-2 items-center justify-center">
              {['AM', 'PM'].map((period) => (
                <div key={period} className="flex flex-col">
                  <h1 className="text-[0.75rem]">{period}</h1>
                  <label
                    onClick={() => setCheckedTime(period)}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <div className="relative">
                      <input type="radio" className="hidden" name="example" />
                      <div className="w-4 h-4 border-blue-500 border-2 rounded-full"></div>
                      {checkedTime === period && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              <label>Duration</label>
              <input
                placeholder="00:00"
                type="number"
                value={duration}
                onChange={handleDurationChange}
                className="w-20 placeholder:text-center px-2 border rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlot;
