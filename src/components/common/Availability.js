'use client';
import React, { useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Image from 'next/image';

export const AvailableDays = ({ setAvailability }) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const initialSchedule = {};

  daysOfWeek.forEach((day) => {
    initialSchedule[day] = [{ from: 0, until: 0 }];
  });

  const [schedule, setSchedule] = useState(initialSchedule);
  const [checkboxes, setCheckboxes] = useState({});

  const handleAddTimeSlot = (day) => {
    if (checkboxes[day]) {
      const newSlot = {
        from: 0,
        until: 0,
      };
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        [day]: [...prevSchedule[day], newSlot],
      }));
    }
  };

  const handleCheckboxChange = (day, checked) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [day]: checked,
    }));
  };

  const handleTimeChange = (time, day, field, indexSlot) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((slot, index) =>
        index === indexSlot ? { ...slot, [field]: time, day } : slot
      ),
    }));
    formatScheduleData();
  };

  const formatScheduleData = () => {
    const availability = [];
    daysOfWeek.forEach((day) => {
      schedule[day].forEach((slot) => {
        if (slot.from && slot.until) {
          availability.push({
            day: day?.toLowerCase(),
            from: slot.from.format('HH:mm'),
            to: slot.until.format('HH:mm'),
          });
        }
      });
    });

    setAvailability(availability);
  };

  return (
    <div className="mt-1 min-h-fit uppercase">
      <div className="flex flex-col text-[#616161]">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex items-center mr-4">
            <div className="flex items-center mr-2">
              <input
                id={`checkbox-${day}`}
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 mb-1 bg-gray-100 border-gray-300 rounded"
                onChange={(e) => handleCheckboxChange(day, e.target.checked)}
              />
            </div>
            <div className="mb-2 mr-3 text-sm w-[4%]">{day}</div>
            {schedule[day].map((slot, slotIndex) => (
              <div key={slotIndex} className="flex text-[0.70rem] mb-2 gap-3 mr-2">
                <div className="w-[5.4rem]">
                  <TimePicker
                    className="w-full custom-time-picker text-[0.70rem]"
                    format="hh:mm A"
                    use12Hours
                    placeholder="From"
                    showSecond={false}
                    clearIcon={false}
                    onChange={(time) => handleTimeChange(time, day, 'from', slotIndex)}
                    value={slot.from ? moment(slot.from, 'HH:mm') : null}
                    disabled={!checkboxes[day]} // Disable TimePicker if checkbox is not checked
                  />
                </div>
                <div className="w-[5.4rem]">
                  <TimePicker
                    className="w-full custom-time-picker text-[0.70rem] flex"
                    showSecond={false}
                    clearIcon={false}
                    format="hh:mm A"
                    use12Hours
                    placeholder="Until"
                    onChange={(time) => handleTimeChange(time, day, 'until', slotIndex)}
                    value={slot.until ? moment(slot.until, 'HH:mm') : null}
                    disabled={!checkboxes[day]} // Disable TimePicker if checkbox is not checked
                  />
                </div>
              </div>
            ))}
            <div>
              <button
                type="button"
                className="py-1 rounded-md"
                onClick={() => handleAddTimeSlot(day)}
                disabled={!checkboxes[day]}
              >
                <Image
                  src={'/svgs/add_time_purple.svg'}
                  className={`cursor-pointer -mt-1 ${!checkboxes[day] ? 'opacity-50' : ''}`}
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
