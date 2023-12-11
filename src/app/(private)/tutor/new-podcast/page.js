'use client';
import {
  CalendarComponent,
  FileInput,
  SubjectDropDown,
  VideoUploadType,
} from '@/components';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { errorToast, successToast } from '@/utils/toasts';

import { validateInput } from '@/utils';

const NewPodcast = () => {
  const { data: user,status } = useSession();
  const [scheduleType, setScheduleType] = useState('Go Live');
  const [client, setClient] = useState(false)
  const axios = useAxios();
  const [podcastType, setPodcastType] = useState('free');
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState(null)
  const [date, setDate] = useState(null)

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.replace('/')
      errorToast('Session Expired.... Logging you out!')
    }
  }, [user, status])


  useEffect(() => {
    setClient(true)
  }, [])



  const onPodcastSubmit = async (e) => {
    e.preventDefault()
    try {
      const fields = [
        { label: 'title', value: title },
        { label: 'description', value: description },
        {
          label: 'subject', value: subject
        },
        {
          label: 'thumbnail', value: file
        }

      ]

      if (!validateInput(fields)) {
        return
      }
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('subject', subject);
      formData.append('thumbnail', file);
      if (podcastType === 'premium' && price > 0) {
        formData.append('price', price);
      }
      if (scheduleType === 'Schedule' && date && time) {
        let formattedTime = moment(time).format('hh:mm:ss')
        let formattedDate = moment(date).format('YYYY-MM-DD')
        let formattedAiringTime = `${formattedDate}T${formattedTime}`
        console.log(formattedAiringTime,"{{airing}}")
        formData.append('airing_time', formattedAiringTime);
      }


      const response = await axios.post(`/podcasts`, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
     
      successToast('Podcast Scheduled!');

      if (scheduleType === 'Go Live') {
        successToast('Joining Podcast!');
        router.push(`/podcast/live/${response?.data?.podcast?.id}?room=${response.data?.podcast?.room_id}&id=${response?.data?.podcast?.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  if (!client) {
    return <div></div>
  }

  return (
    <div className="relative mx-auto flex gap-4 justify-center  flex-col px-4 my-16">
      <form
        onSubmit={onPodcastSubmit}
        className="flex gap-4 lg:flex-row w-fit lg:w-auto flex-col lg:items-start justify-center"
      >
        <div className="lg:w-fit ">
          <VideoUploadType

            setPrice={setPrice} type={podcastType} setType={setPodcastType} />
          <VideoInfoForm
            setDescription={setDescription} description={description}
            title={title} setTitle={setTitle}
            setSubject={setSubject} subject={subject}
            file={file} setFile={setFile} />
        </div>

        <div className="md:w-fit w-full">
          <ScheduleType scheduleType={scheduleType} setScheduleType={setScheduleType} />
          <VideoSchedule setDate={setDate} setTime={setTime} time={time} scheduleType={scheduleType} setScheduleType={setScheduleType} />
          <div className="flex justify-end">
            <Button
              type="submit"
              className={`mt-4 text-lg ${scheduleType === 'Go Live' ? 'bg-[#FB3C22]' : 'bg-black'}`}
            >
              {scheduleType === 'Go Live' ? 'Go Live' : 'Schdeule'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPodcast;

const VideoInfoForm = ({ title, setTitle, description, setDescription, setFile, file, subject, setSubject }) => {
  const [ticketType, setTicketType] = useState('unlimited');

  return (
    <div className="bg-white text-sm p-4 flex md:flex-row flex-col gap-4 rounded-md shadow-md mt-4">
      <div className="flex flex-col uppercase gap-2 ">
        <div className="flex flex-col">
          <label className="text-[#616161] font-light">PODCAST TITLE</label>

          <input
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
            placeholder="Enter title..."
            className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none `}
            type="text"
          />


        </div>
        <div className="flex flex-col">
          <label className="text-[#616161] font-light">Podcast Description</label>

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description..."
            className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none`}
            type="text"
          />


        </div>
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="flex flex-col">
          <label className="text-sm text-[#616161] font-light">SUBJECT</label>
          <SubjectDropDown onValueChange={setSubject} selectedValue={subject}/>
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

const VideoSchedule = ({ scheduleType, setScheduleType, setTime, setDate, time }) => {
  return (
    <div className={`bg-white relative rounded-md shadow-md p-[0.30rem]`}>
      {scheduleType === 'Go Live' && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center rounded-md justify-center font-bold bg-[#6f6b6b40] backdrop-blur-sm z-50">
          <p>Stream will begin shortly</p>
        </div>
      )}
      <TimeSlot setTime={setTime} time={time} setDate={setDate} scheduleType={scheduleType} />
    </div>
  );
};

const ScheduleType = ({ setScheduleType }) => {
  const [translate, setTranslate] = useState(false)

  return (
    <div className="flex items-center gap-4 mb-4">
      <p>GO LIVE</p>
      <div className="flex gap-2 items-center">

        <button
          onClick={() => {
            let newTranslate = !translate
            setScheduleType(newTranslate ? 'Schedule' : 'Go Live');
            setTranslate(newTranslate);
          }}
          type="button"
          className={`w-10 h-4 rounded-2xl bg-white flex shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] items-center transition duration-300 focus:outline-none `}
        >
          <div
            style={{ backgroundColor: '#FB3C22' }}
            className={`w-6 h-6 relative rounded-full transition duration-300 transform p-1 ${translate ? 'translate-x-full' : "-translate-x-2"}`}
          >
            <img src={'/svgs/calendar_white.svg'} className="h-4 w-4" alt="Icon" />
          </div>
        </button>
      </div>
      <span>SCHEDULE</span>
    </div>
  );
};

const TimeSlot = ({ setTime, setDate, time }) => {
  console.log(time)
  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };
  const handleDateChange = (newDate) => {
    console.log(newDate,"{date}/")
    setDate(newDate);
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col md:items-center pb-2 px-2 justify-between md:pb-0">
        <CalendarComponent noRound={true} handleDateChange={handleDateChange} />
        <div className=" md:block flex px-4 justify-between">
          <div className="flex flex-col">
            <label className="font-thin">TIME:</label>
            <TimePicker
              showSecond={false}
              format="hh:mm A"
              use12Hours
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
