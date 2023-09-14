'use client';
import React, { useState, useRef, useEffect, use } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AvailableDays, CalendarComponent } from '@/components';
import Image from 'next/image';

export const EventsCalendar = () => {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState({});
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleDate, setTitleDate] = useState(null);
  const [viewType, setViewType] = useState('timeGridWeek');
  const [organizedEventsByDay, setOrganizedEventsByDay] = useState({});
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const handleDateClick = (arg) => {
    const selectedStartTime = arg.date;
    setSelectedDate(selectedStartTime);
    setIsModalOpen(true);
  };

  const handleOrganizeEventsByDay = (events) => {
    const organizedEvents = {};

    const today = moment().startOf('day');
    const tomorrow = moment().startOf('day').add(1, 'days');

    events.forEach((event) => {
      const startDay = moment(event.start).startOf('day');

      let dayLabel = '';
      if (startDay.isSame(today, 'day')) {
        dayLabel = 'Today';
      } else if (startDay.isSame(tomorrow, 'day')) {
        dayLabel = 'Tomorrow';
      } else {
        dayLabel = startDay.format('dddd-DD');
      }

      if (!organizedEvents[dayLabel]) {
        organizedEvents[dayLabel] = [];
      }

      organizedEvents[dayLabel].push(event);
    });

    return organizedEvents;
  };

  useEffect(() => {
    setOrganizedEventsByDay(handleOrganizeEventsByDay(calendarEvents));
  }, [calendarEvents]);

  const handleConfirm = (eventText, eventBackgroundColor, eventBorderColor, textColor) => {
    const newEvent = {
      id: Math.floor(Math.random() * 100000000),
      title: eventText,
      start: selectedDate,
      end: selectedDate,
      backgroundColor: eventBackgroundColor,
      borderColor: eventBorderColor,
      textColor: textColor,
    };

    setCalendarEvents([...calendarEvents, newEvent]);
    setIsModalOpen(false);
  };

  const handleChangeView = (event) => {
    setViewType(event);
    calendarRef.current.getApi().changeView(event);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        {eventInfo.event.title}
        <span>
          <div className="">{moment(eventInfo.event.start).format('hh:mm')}</div>
        </span>
      </>
    );
  };

  const handleAvailabilityClick = () => {
    setIsAvailabilityOpen(!isAvailabilityOpen);
  };

  useEffect(() => {
    const fullCalendarApi = calendarRef.current.getApi();

    setTitleDate(moment(fullCalendarApi.getDate()).format('DD-MM MMMM YYYY'));
  }, []);

  const viewOptions = {
    timeGridWeek: 'Week',
    timeGridDay: 'Day',
    dayGridMonth: 'Month',
  };

  const handleDateChange = (date) => {
    setTitleDate(moment(date).format('DD-MM MMMM YYYY'));

    calendarRef.current.getApi().gotoDate(moment(date).toDate());
  };

  const handleEventDrop = (eventDrop) => {
    const updatedEvent = {
      ...eventDrop.event.toPlainObject(),
      start: eventDrop.event.start,
      end: eventDrop.event.start,
    };

    const updatedEvents = calendarEvents.map((event) => {
      if (parseInt(event.id) === parseInt(updatedEvent.id)) {
        return updatedEvent;
      }
      return event;
    });

    setCalendarEvents(updatedEvents);
  };

  return (
    <div className="mt-8 flex shadow-md">
      <div>
        <CalendarComponent handleDateChange={handleDateChange} styleCal={`rounded-tl-md`} />
        <div className="bg-white px-4 py-4">
          <EventList organizedEvents={organizedEventsByDay} />
        </div>
      </div>
      <div className="w-full border-l border">
        <div className="flex justify-between items-center bg-white pt-4 px-4">
          <div className="flex gap-4 items-center">
            <span className=" text-2xl font-semibold">{titleDate}</span>
            <select
              value={viewType}
              className="border-[#1850BC] text-[#1850BC] focus:outline-none border-2 text-sm rounded-md py-1 px-2"
              onChange={(e) => handleChangeView(e.target.value)}
            >
              {Object.keys(viewOptions).map((option) => (
                <option key={option} value={option}>
                  {viewOptions[option]}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-[#1850BC] text-white px-4 rounded-md text-sm py-2"
            onClick={handleAvailabilityClick}
          >
            Edit Availability
          </button>
        </div>

        <FullCalendar
          headerToolbar={false}
          editable={true}
          ref={calendarRef}
          eventDrop={handleEventDrop}
          plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
          dayHeaderContent={(args) => {
            const dayName = args.text.substr(0, 3);
            const dayNumber = args.date.getDate();

            return (
              <div className="flex flex-col">
                <span>{dayName}</span>
                <span className="text-sm font-medium">{dayNumber}</span>
              </div>
            );
          }}
          initialView={viewType}
          dateClick={handleDateClick}
          events={calendarEvents}
          eventContent={renderEventContent}
        />

        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          selectedDate={selectedDate}
        />
      </div>
      {isAvailabilityOpen && (
        <div className="bg-gray-100 h-full w-full fixed top-0 left-0 flex items-center z-[1000] justify-center">
          <div
            className="p-4 bg-white shadow-md rounded-md w-[60%]
          "
          >
            <h2 className="text-[#616161] font-thin uppercase">Availability</h2>
            <AvailableDays />
            <div className="flex gap-2 justify-end mt-2">
              <button
                onClick={() => setIsAvailabilityOpen(false)}
                className="px-4 py-[0.18rem] border-2 font-medium border-black flex gap-2 items-center text-black rounded-md shadow-md"
              >
                <Image src={'/svgs/cancel_black.svg'} alt="cancel" width={18} height={18} /> Cancel
              </button>
              <button className="px-4 py-[0.18rem] border-2 border-[#1850BC] font-medium flex gap-2 items-center text-[#1850BC] rounded-md shadow-md ">
                <Image src={'/svgs/confirm_blue.svg'} alt="cancel" width={18} height={18} /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomModal = ({ isOpen, onClose, selectedDate, onConfirm }) => {
  const [eventText, setEventText] = useState('');

  const [selectedBackground, setSelectedBackground] = useState('#4DA9FF99');
  const [selectedBorder, setSelectedBorder] = useState('#FFFFFF');
  const [selectedTextColor, setSelectedTextColor] = useState('#000000');

  const handleConfirm = () => {
    if (eventText) {
      onConfirm(eventText, selectedBackground, selectedBorder, selectedTextColor);
      setEventText('');
      onClose();
    }
  };
  const eventBackgroundColors = [
    '#4DA9FF99',
    '#1850BC',
    '#D6C8FF',
    '#F54D4D',
    '#FFDDDD',
    '#684D08',
    '#FFEBB7',
  ];
  const eventBorderColors = [
    '#FFFFFF',
    '#4DA9FF99',
    '#1850BC',
    '#D6C8FF',
    '#F54D4D',
    '#FFDDDD',
    '#684D08',
    '#FFEBB7',
  ];

  const textColors = [
    '#FFFFFF',
    '#000000',
    '#A384FF',
    '#1850BC',
    '#666666',
    '#721818',
    '#684D08',
    '#131C6D',
  ];

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? 'block z-50' : 'hidden'
      } bg-gray-700 bg-opacity-75 flex items-center justify-center`}
    >
      <div className="modal-content bg-white w-1/3 rounded-md shadow-md ">
        <div className="bg-gray-200 py-1 w-full flex justify-end px-4">
          <svg
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-7 p-1 h-7 cursor-pointer hover:bg-gray-300 hover:rounded-full"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Add Event</h2>
          <div className="flex flex-col w-3/4 gap-1">
            <label className="text-sm font-medium gap-2">Start Time</label>
            <input
              disabled
              value={selectedDate ? moment(selectedDate).format('YYYY-MM-DD hh:mm A') : ''}
              className="focus:outline-none text-gray-500 py-1 px-2 bg-gray-300 rounded-md shadow"
            />
          </div>
          <div className="flex flex-col mt-2 w-3/4 gap-1">
            <label className="text-sm font-medium">Event Title</label>
            <input
              className="border rounded-md focus:outline-none px-2 py-1 w-full mb-2"
              type="text"
              placeholder="Enter event"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Event Color</label>
            <div className="flex gap-4 ">
              {eventBackgroundColors.map((bg) => (
                <div
                  key={bg}
                  onClick={() => setSelectedBackground(bg)}
                  style={{ backgroundColor: bg }}
                  className={`cursor-pointer ${
                    selectedBackground === bg && 'ring-2 ring-offset-1'
                  } h-6 w-6 rounded-full transition duration-300 transform hover:ring-2 ring-offset-2 ring-opacity-50 hover:scale-110`}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex mt-2 flex-col gap-1">
            <label className="text-sm font-medium">Event Border</label>
            <div className="flex gap-4">
              {eventBorderColors.map((bg) => (
                <div
                  onClick={() => setSelectedBorder(bg)}
                  key={bg}
                  style={{ backgroundColor: bg }}
                  className={` ${
                    selectedBorder === bg && 'ring-2 ring-offset-1'
                  } cursor-pointer h-6 w-6 rounded-full transition duration-300 transform hover:ring-2 ring-offset-2 ring-opacity-50 hover:scale-110`}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex mt-2 flex-col gap-1">
            <label className="text-sm font-medium">Text Color</label>
            <div className="flex gap-4">
              {textColors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedTextColor(color)}
                  style={{ backgroundColor: color }}
                  className={` ${
                    selectedTextColor === color && 'ring-2 ring-offset-1'
                  } cursor-pointer h-6 w-6 rounded-full transition duration-300 transform hover:ring-2 ring-offset-2 ring-opacity-50 hover:scale-110`}
                ></div>
              ))}
            </div>
          </div>
          <button
            onClick={handleConfirm}
            className="bg-[#1850BC] text-white px-4 rounded-md text-sm py-2 font-medium w-full  mt-4"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const EventList = ({ organizedEvents }) => {
  for (const dayLabel in organizedEvents) {
    organizedEvents[dayLabel].sort((a, b) => moment(a.start).diff(b.start));
  }
  return (
    <div>
      {Object.keys(organizedEvents).map((dayLabel) => (
        <div key={dayLabel} className="mb-4">
          <h2 className="text-lg font-semibold mb-2">{dayLabel}</h2>
          {organizedEvents[dayLabel].map((event) => (
            <div
              key={event.id}
              className="flex text-[0.70rem] font-semibold justify-between items-center mb-2"
            >
              <div className="flex items-center capitalize">
                <div
                  className="w-4 h-4 mr-2 rounded-full"
                  style={{ backgroundColor: event.backgroundColor }}
                ></div>
                <span style={{ color: event.backgroundColor }} className="font-bold">
                  {event.title}
                </span>
              </div>
              <div className="">{moment(event.start).format('hh:mm')}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
