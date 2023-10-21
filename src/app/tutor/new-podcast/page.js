'use client';
import {
  CalendarComponent,
  FileInput,
  TranslationToggleButton,
  VideoUploadType,
} from '@/components';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { successToast } from '@/utils/toasts';

const NewPodcast = () => {
  const { data: user } = useSession();
  const [scheduleType, setScheduleType] = useState('Go Live');
  const axios = useAxiosPrivate();
  const [podcastType, setPodcastType] = useState('free');
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onPodcastSubmit = async (body) => {
    console.log(body, 'body', file);
    try {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('description', body.description);
      formData.append('subject', body.subject);
      formData.append('thumbnail', file);
      if (scheduleType === 'Go Live') {
        formData.append('live', true);
      }
      if (podcastType === 'premium' && price > 0) {
        formData.append('price', price);
      }
      console.log('submit');
      const response = await axios.post(`/podcasts`, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      successToast('Joining Podcast!');

      console.log(response.data, 'res');
      router.push(`/podcast/live?room=${response.data?.podcast?.room_id}&tutorId=${user.user?.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative mx-auto flex gap-4 justify-center  flex-col px-4 my-16">
      <form
        onSubmit={handleSubmit(onPodcastSubmit)}
        className="flex gap-4 lg:flex-row w-fit lg:w-auto flex-col lg:items-start justify-center"
      >
        <div className="lg:w-fit ">
          <VideoUploadType setPrice={setPrice} type={podcastType} setType={setPodcastType} />
          <VideoInfoForm file={file} setFile={setFile} errors={errors} control={control} />
        </div>

        <div className="md:w-fit w-full">
          <ScheduleType scheduleType={scheduleType} setScheduleType={setScheduleType} />
          <VideoSchedule scheduleType={scheduleType} setScheduleType={setScheduleType} />
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

const VideoInfoForm = ({ control, errors, setFile, file }) => {
  const [ticketType, setTicketType] = useState('unlimited');

  return (
    <div className="bg-white text-sm p-4 flex md:flex-row flex-col gap-4 rounded-md shadow-md mt-4">
      <div className="flex flex-col uppercase gap-2 text-[#616161] font-light">
        <div className="flex flex-col">
          <label className="text-[#616161] font-light">PODCAST TITLE</label>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: 'Book title is required' }}
            render={({ field }) => (
              <input
                {...field}
                name="title"
                placeholder="Enter title..."
                className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none ${
                  errors.bookTitle ? 'border-red-500' : ''
                }`}
                type="text"
              />
            )}
          />
          {errors.bookTitle && (
            <span className="text-red-500 text-sm mt-1 lowercase">{errors.bookTitle.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-[#616161] font-light">Podcast Description</label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: 'Book title is required' }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter title..."
                className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none ${
                  errors.title ? 'border-red-500' : ''
                }`}
                type="text"
              />
            )}
          />
          {errors.bookTitle && (
            <span className="text-red-500 text-sm mt-1 lowercase">{errors.bookTitle.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="flex flex-col">
          <label className="text-sm text-[#616161] font-light">SUBJECT</label>
          <Controller
            name="subject"
            control={control}
            defaultValue=""
            rules={{ required: 'Subject is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Subjects</SelectLabel>
                    <SelectItem value="1">English</SelectItem>
                    <SelectItem value="2">Chemistry</SelectItem>
                    <SelectItem value="3">Physics</SelectItem>
                    <SelectItem value="4">Science</SelectItem>
                    <SelectItem value="5">Maths</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.subject && (
            <span className="text-red-500 text-sm mt-1 lowercase">{errors.subject.message}</span>
          )}
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
