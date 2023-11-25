'use client';
import React, { useState, useRef, useEffect, use } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AvailableDays, CalendarComponent } from '@/components';
import Image from 'next/image';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useSession } from 'next-auth/react';
import { successToast } from '@/utils/toasts';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from 'react-day-picker';
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



export const EventsCalendar = () => {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState({ startTime: "", endTime: "" });
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleDate, setTitleDate] = useState(null);
  const [viewType, setViewType] = useState('timeGridWeek');
  const [organizedEventsByDay, setOrganizedEventsByDay] = useState({});
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({})
  const [isUpdating, setIsUpdating] = useState(false)
  const axios = useAxiosPrivate()

  const { data: user } = useSession()


  const mapProperties = (data, propertyMap) => {
    const mappedObject = {};
    console.log("########mappppeeddd##########")
    console.log(propertyMap)
    Object.keys(propertyMap).forEach((key) => {
      mappedObject[key] = data?.[propertyMap[key]];
    });

    return mappedObject;
  };


  const updateEventInArray = (events, updatedEvent, propertyMap) => {
    return events.map((event) => {
      if (parseInt(event.id) === parseInt(updatedEvent?.id)) {
        const updatedProperties = mapProperties(updatedEvent, propertyMap);
        return { ...event, ...updatedProperties };
      }
      return event;
    });
  };


  const fetchUserCalendar = async () => {
    try {
      const { data } = await axios.get(`/users/calender`, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });

      const newEvents = data?.events.map((event) => ({
        id: event?.id,
        title: event?.title,
        start: event?.start_time,
        end: event?.end_time,
        backgroundColor: event?.color,
        borderColor: event?.border,
        textColor: event?.text_color,
      }));

      setCalendarEvents([...newEvents]);
    } catch (err) {
      console.error(err);
    }
  };

  const addEventToCalendar = async (eventToSend) => {
    try {
      const { data } = await axios.post(`/users/calender`, eventToSend, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });

      successToast("Event Added!");

      const eventToSet = {
        id: data?.event?.id,
        title: data?.event?.title,
        start: data?.event?.start_time,
        end: data?.event?.end_time,
        backgroundColor: data?.event?.color,
        borderColor: data?.event?.border,
        textColor: data?.event?.text_color,
      };

      setCalendarEvents([...calendarEvents, eventToSet]);
      setIsModalOpen(false);
    } catch (err) {
      // Handle errors
      console.error(err);
    }
  };

  const updateEventInCalendar = async (eventId, updatedEvent) => {
    try {
      const { data } = await axios.patch(`/users/calender/${eventId}`, updatedEvent, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });

      const eventPropertyMap = {
        id: 'id',
        start: 'start_time',
        end: 'end_time',
        borderColor: 'border_color',
        backgroundColor: 'color',
        textColor: 'text_color',
        title: 'title',
      };

      successToast("Updated Event!");

      setCalendarEvents(updateEventInArray(calendarEvents, data?.updatedEvent, eventPropertyMap))

    } catch (err) {

      console.error(err);
    }
  };





  const handleDateClick = (arg) => {
    setIsUpdating(false)
    setUpdatedEvent(null)
    setSelectedDate({
      startTime: arg.date,
      endTime: moment(arg.date).add(30, "minutes").toDate()
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchUserCalendar()
  }, [])


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

  const handleConfirm = async (eventText, eventBackgroundColor, eventBorderColor, textColor) => {
    const selectedStartTime = selectedDate.startTime;
    const selectedEndTime = selectedDate.endTime;

    const eventToSend = {
      title: eventText,
      start_time: selectedStartTime,
      end_time: selectedEndTime,
      color: eventBackgroundColor,
      border: eventBorderColor,
      text_color: textColor,
    };

    await addEventToCalendar(eventToSend);
  };
  const handleChangeView = (event) => {
    setViewType(event);
    calendarRef.current.getApi().changeView(event);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className='text-[0.60rem] font-semibold flex justify-between w-full items-center'>
        {eventInfo.event.title}
        <span>
          <div className="text-[0.5rem]">
            {moment(eventInfo.event.start).format('hh:mm A')}
          </div>
        </span>
      </div>
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

  const handleEventDrop = async (dropInfo) => {
    const updatedEvent = {
      start_time: dropInfo.event.start.toISOString(),
      end_time: dropInfo.event.end ? dropInfo.event.end.toISOString() : null,
    };

    try {
      const eventId = parseInt(dropInfo.event.id);

      await updateEventInCalendar(eventId, updatedEvent);
    } catch (err) {
      console.error(err);
    }
  };



  const handleEventResize = async (resizeInfo) => {
    const eventId = parseInt(resizeInfo.event.id);
    const updatedEvent = {
      start_time: resizeInfo.event.start.toISOString(),
      end_time: resizeInfo.event.end ? resizeInfo.event.end.toISOString() : null,
    };
    await updateEventInCalendar(eventId, updatedEvent)
  };

  const handleConfirmUpdate = async (eventText, eventBackgroundColor, eventBorderColor, textColor) => {
    const selectedStartTime = selectedDate.startTime;
    const selectedEndTime = selectedDate.endTime;

    const eventToSend = {
      title: eventText,
      start_time: selectedStartTime,
      end_time: selectedEndTime,
      color: eventBackgroundColor,
      border: eventBorderColor,
      text_color: textColor,
    };

    console.log(updatedEvent)
    await updateEventInCalendar(updatedEvent?.id, eventToSend)
  }


  const handleDelete = async (id) => {
    console.log(updatedEvent?.id)
    try {
      await axios.delete(`/users/calender/${updatedEvent?.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      successToast('Event Deleted!')
      fetchUserCalendar()
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
    }
  }




  return (
    <div className="mt-8 flex bg-white shadow-md">
      <div className='border  w-[22%]'>
        <CalendarComponent handleDateChange={handleDateChange} styleCal={`rounded-tl-md`} />
        <div className="bg-white px-4 py-4">
          <EventList organizedEvents={organizedEventsByDay} />
        </div>
      </div>
      <div className="w-[78%] border-l border">
        <div className="flex justify-between items-center bg-white pt-4 px-4">
          <div className="flex gap-4 items-center">
            <span className=" text-2xl font-semibold">{titleDate}</span>
            <select
              value={viewType}
              className="border-main text-main focus:outline-none border-2 text-sm rounded-md py-1 px-2"
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
            className="bg-main text-white px-4 rounded-md text-sm py-2"
            onClick={handleAvailabilityClick}
          >
            Edit Availability
          </button>
        </div>

        <FullCalendar
          headerToolbar={false}
          editable={true}
          eventResize={handleEventResize}
          eventClick={(info) => {
            console.log(info?.event.end, info?.event.title)
            setIsUpdating(true)
            setUpdatedEvent({
              id: info?.event?.id,
              end: info?.event?.end,
              title: info?.event?.title,
              start: info?.event?.start,
              borderColor: info?.event?.borderColor,
              textColor: info?.event?.textColor,
              backgroundColor: info?.event?.backgroundColor
            })
            setSelectedDate({
              startTime: info?.event?.start,
              endTime: info?.event?.end
            })
            setIsModalOpen(true)
          }}
          ref={calendarRef}
          eventDrop={handleEventDrop}
          plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
          dayHeaderContent={(args) => {
            const dayName = args?.text.substr(0, 3);
            const dayNumber = args?.date.getDate();

            return (
              <div className=" inline-flex flex-col">
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
          updatedEvent={updatedEvent}
          setIsUpdating={setIsUpdating}
          isUpdating={isUpdating}
          setIsOpen={setIsModalOpen}
          setSelectedDate={setSelectedDate}
          setUpdatedEvent={setUpdatedEvent}
          handleDelete={handleDelete}
          onConfirm={isUpdating ? handleConfirmUpdate : handleConfirm}
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
              <button className="px-4 py-[0.18rem] border-2 border-main font-medium flex gap-2 items-center text-main rounded-md shadow-md ">
                <Image src={'/svgs/confirm_blue.svg'} alt="cancel" width={18} height={18} /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomModal = ({ isOpen, setIsOpen, updatedEvent, onClose, selectedDate, handleDelete, isUpdating, setIsUpdating, onConfirm, setSelectedDate }) => {




  const [eventText, setEventText] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('#4DA9FF99');
  const [selectedBorder, setSelectedBorder] = useState('#FFFFFF');
  const [selectedTextColor, setSelectedTextColor] = useState('#000000');
  const [endTimeOption, setEndTimeOption] = useState(30);
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    setEventText('')
  }, [isOpen])


  useEffect(() => {
    if (updatedEvent) {
      setEventText(updatedEvent.title || '');
      setSelectedBackground(updatedEvent.backgroundColor || '#4DA9FF99');
      setSelectedBorder(updatedEvent.borderColor || '#FFFFFF');
      setSelectedTextColor(updatedEvent.textColor || '#000000');
    }
  }, [updatedEvent]);

  const handleConfirm = () => {
    if (eventText) {
      onConfirm(eventText, selectedBackground, selectedBorder, selectedTextColor);
      setEventText('');
      onClose();
    }
  };

  const generateEndTimeOptions = () => {
    const options = [];
    let currentTime = moment(selectedDate?.startTime).add(30, 'minutes');

    while (currentTime.isBefore(moment(selectedDate?.startTime).add(1, 'day'))) {
      options.push(currentTime.format('YYYY-MM-DD hh:mm A'));
      currentTime.add(30, 'minutes');
    }

    return options;
  };

  const handleEndTimeOptionChange = (e) => {
    const selectedOption = e.target.value;
    setEndTimeOption(selectedOption);

    const formattedEndTime = moment(selectedOption).toDate();
    setSelectedDate((prevSelectedDate) => ({
      ...prevSelectedDate,
      endTime: formattedEndTime,
    }));

    setEndTime(formattedEndTime);
  };


  return (
    <Dialog
      open={isOpen} onOpenChange={setIsOpen}
    >
      <DialogContent className="modal-content bg-white w-1/3 rounded-md shadow-md ">

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{isUpdating ? "Update Event" : "Add Event"}</h2>
          <div className="flex flex-col w-3/4 gap-1">
            <label className="text-sm font-medium gap-2">Start Time</label>
            <input
              disabled
              value={selectedDate?.startTime ? moment(selectedDate?.startTime).format('YYYY-MM-DD hh:mm A') : ''}
              className="focus:outline-none text-gray-500 py-1 px-2 bg-gray-300 rounded-md shadow"
            />
          </div>

          <div className="flex flex-col w-3/4 gap-1">
            <label className="text-sm font-medium gap-2">End Time</label>
            <select
              value={endTimeOption}
              onChange={handleEndTimeOptionChange}
              className="border rounded-md focus:outline-none px-1 py-1 mb-2"
            >
              {generateEndTimeOptions().map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
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
                  className={`cursor-pointer ${selectedBackground === bg && 'ring-2 ring-offset-1'
                    } h-6 w-6 rounded-full shadow-md transition duration-300 transform hover:ring-2 ring-offset-2 ring-opacity-50 hover:scale-110`}
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
                  className={` ${selectedBorder === bg && 'ring-2 ring-offset-1'
                    } cursor-pointer h-6 w-6 rounded-full shadow-md transition duration-300 transform hover:ring-2 ring-offset-2 ring-opacity-50 hover:scale-110`}
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
                  className={` ${selectedTextColor === color && 'ring-2 ring-offset-1'
                    } cursor-pointer h-6 w-6 rounded-full shadow-md transition duration-300 transform hover:ring-2 ring-offset-2 ring-opacity-50 hover:scale-110`}
                ></div>
              ))}
            </div>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={handleConfirm}
              className="bg-main text-white px-4 rounded-md text-sm py-2 font-medium w-full  mt-4"
            >
              Save
            </button>
            {isUpdating && <button onClick={handleDelete} className='bg-subcolor2 text-white px-4 rounded-md text-sm py-2 font-medium w-full box-shadow-main  mt-4'>Delete</button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EventList = ({ organizedEvents }) => {
  for (const dayLabel in organizedEvents) {
    organizedEvents[dayLabel].sort((a, b) => moment(a.start).diff(b.start));
  }
  return (
    <div>
      {Object.keys(organizedEvents).reverse().map((dayLabel) => (
        <div key={dayLabel} className="mb-4">
          <h2 className="text-lg font-semibold mb-2">{dayLabel}</h2>
          {organizedEvents[dayLabel].map((event) => (
            <div
              key={event.id}
              className="flex flex-col text-[0.70rem] font-semibold justify-between mb-2"
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
              <div>
                <div className=" w-full flex justify-end">{moment(event.start).format('hh:mm')}-{moment(event.end).format('hh:mm')}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
