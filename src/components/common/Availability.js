'use client';
import React, { useState } from 'react';
// import TimePicker from 'rc-time-picker';
import Image from 'next/image';
export const AvailableDays = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const initialSchedule = {};

  daysOfWeek.forEach((day) => {
    initialSchedule[day] = [{ from: 0, until: 0 }];
  });

  const [schedule, setSchedule] = useState(initialSchedule);
  console.log(schedule);

  const handleAddTimeSlot = (day) => {
    const newSlot = {
      day,
      from: 0,
      until: 0,
    };
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: [...prevSchedule[day], newSlot],
    }));
  };

  const handleTimeChange = (time, day, field, indexSlot) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((slot, index) =>
        index === indexSlot ? { ...slot, [field]: time } : slot
      ),
    }));
  };

  return (
    <div className="mt-4 min-h-fit">
      <div className="flex flex-col">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex mr-4">
            <div className="mb-2 mr-4 min-w-[10%]">{day}</div>
            {schedule[day].map((slot, slotIndex) => (
              <div key={slotIndex} className="flex mb-2 ">
                <div className="w-24 mr-2">
                  {/* <TimePicker
                    showSecond={false}
                    onChange={(time) => handleTimeChange(time, day, 'from', slotIndex)}
                  /> */}
                </div>
                <div className="w-24 mr-2">
                  {/* <TimePicker
                    className=""
                    showSecond={false}
                    onChange={(time) => handleTimeChange(time, day, 'until', slotIndex)}
                  /> */}
                </div>
              </div>
            ))}
            <div>
              <button className="py-1 rounded-md" onClick={() => handleAddTimeSlot(day)}>
                <Image
                  src={'/svgs/add_box.svg'}
                  className="cursor-pointer"
                  alt="add Interest"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
