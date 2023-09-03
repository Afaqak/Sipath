'use client';
import {
  CalendarComponent,
  FileInput,
  TranslationToggleButton,
  SubjectDropdown,
  VideoUploadType,
} from '@/components';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { useState } from 'react';

const NewPodcast = () => {
  console.log('tested');
  const [scheduleType, setScheduleType] = useState('');
  const [podcastType, setPodcastType] = useState('free');

  return (
    <div className="relative mx-auto flex gap-4 justify-center  flex-col px-4 my-16">
      <div className="flex gap-4 lg:flex-row w-fit lg:w-auto flex-col lg:items-start justify-center">
        <div className="lg:w-fit ">
          <VideoUploadType type={podcastType} setType={setPodcastType} />
          <VideoInfoForm />
        </div>

        <div className="md:w-fit w-full">
          <ScheduleType scheduleType={scheduleType} setScheduleType={setScheduleType} />
          <VideoSchedule scheduleType={scheduleType} setScheduleType={setScheduleType} />
          <div className="flex justify-end">
            <button
              className={`rounded-md w-full md:w-fit px-8 mt-4 py-1 text-white ${
                scheduleType === 'Go Live' ? 'bg-[#FB3C22]' : 'bg-black'
              }`}
            >
              {scheduleType === 'Go Live' ? 'Go Live' : 'Schdeule'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPodcast;

const VideoInfoForm = () => {
  const [dropDown, setDropDown] = useState(null);
  const [ticketType, setTicketType] = useState('unlimited');
  const [file, setFile] = useState(null);

  // Function to handle radio button change

  return (
    <div className="bg-white text-sm p-4 flex md:flex-row flex-col gap-4 rounded-md shadow-md mt-4">
      <div className="flex flex-col uppercase gap-2 text-[#616161] font-light">
        <div className="flex flex-col">
          <label className="text-sm">Video title</label>
          <input
            placeholder="Enter title..."
            className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-[0.35rem] placeholder:text-sm border-none focus:outline-none"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Video Description</label>
          <textarea
            rows={5}
            cols={6}
            typeof="text"
            placeholder="Enter description"
            className="md:w-48 w-full  shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none "
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div>
          <label>SUBJECT</label>
          <SubjectDropdown dropDown={dropDown} setDropDown={setDropDown} />
        </div>
        <div>
          TICKET LIMIT <span>(OPTIONAL)</span>
          <div className="flex gap-4 ">
            <div className="flex gap-2">
              <label className="inline-flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    className="hidden"
                    name="example"
                    onChange={() => setTicketType('unlimited')}
                  />
                  <div className="w-4 h-4 border-blue-500 border-2 rounded-full"></div>
                  {ticketType === 'unlimited' && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </label>
              <h2>Unlimited</h2>
            </div>
            <div className="flex gap-2">
              <label className="inline-flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    className="hidden"
                    name="example"
                    onChange={() => setTicketType('quantity')}
                  />
                  <div className="w-4 h-4 border-blue-500 border-2 rounded-full"></div>
                  {ticketType === 'quantity' && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </label>
              <h2>Ticket Quantuity</h2>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <label>UPLOAD THUMBNAIL</label>
            <FileInput file={file} setFile={setFile} />
          </div>
          <div className="rounded-md text-center p-3 font-medium text-sm text-black bg-[#D9D9D9]">
            Thumbnail <br /> preview
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoSchedule = ({ scheduleType, setScheduleType }) => {
  return (
    <div className={`bg-white relative rounded-md shadow-md p-[0.30rem]`}>
      {scheduleType === 'Go Live' && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center rounded-md justify-center font-bold bg-[#6f6b6b40] backdrop-blur-sm z-50">
          <p>Stream will begin shortly</p>
        </div>
      )}
      <TimeSlot scheduleType={scheduleType} />
    </div>
  );
};

const ScheduleType = ({ setScheduleType, scheduleType }) => {
  const handleUpload = (isTranslated) => {
    if (isTranslated) {
      setScheduleType('Go Live');
    } else {
      setScheduleType('Schedule');
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <p>GO LIVE</p>
      <div className="flex gap-2 items-center">
        <TranslationToggleButton
          color={'#FB3C22'}
          image={'/svgs/calendar_white.svg'}
          onClick={handleUpload}
        />
      </div>
      <span>SCHEDULE</span>
    </div>
  );
};

const TimeSlot = () => {
  const [time, setTime] = useState(null);

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col md:items-center pb-2 px-2 justify-between md:pb-0">
        {/* Calendar */}
        <CalendarComponent noRound={true} />

        <div className=" md:block flex px-4 justify-between">
          <div className="flex flex-col">
            <label className="font-thin">TIME:</label>
            <TimePicker
              showSecond={false}
              format="hh:mm A"
              use12Hours
              clearIcon={true}
              inputReadOnly
              className="mt-1 px-4 py-2 w-full focus:outline-none border rounded-md bg-gray-50"
              placeholder="Select time"
              value={time}
              onChange={handleTimeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
