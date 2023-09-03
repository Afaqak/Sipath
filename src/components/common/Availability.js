'use client';
import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Image from 'next/image';
export const AvailableDays = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
            <div class="flex items-center mr-2 mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
              />
            </div>
            <div className="mb-2 mr-3 text-sm w-[4%]">{day}</div>
            {schedule[day].map((slot, slotIndex) => (
              <div key={slotIndex} className="flex text-sm mb-2 gap-3 mr-2">
                <div className="w-16">
                  {' '}
                  <TimePicker
                    className="w-full custom-time-picker"
                    format="HH:mm"
                    placeholder="From"
                    onChange={(time) => handleTimeChange(time, day, 'from', slotIndex)}
                    value={slot.from ? moment(slot.from, 'HH:mm') : null}
                  />
                </div>
                <div className="w-16 text-sm">
                  <TimePicker
                    className="w-full custom-time-picker"
                    format="HH:mm"
                    placeholder="Until"
                    onChange={(time) => handleTimeChange(time, day, 'until', slotIndex)}
                    value={slot.until ? moment(slot.until, 'HH:mm') : null}
                  />
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
