'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { TextareaField, Modal } from '@/components';

export const OnBoardingProcess = () => {
  const [interests, setInterests] = useState([]);
  const [modelOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [bio, setBio] = useState('');
  const handleModalSubmit = (val) => {
    setInterests([...interests, val]);
    setModalOpen(false);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-[70%] bg-white w-[70%] flex flex-col justify-between mx-auto relative rounded-md shadow-md p-5">
        <div className=" ">
          <h1 className="text-xl mb-4 font-semibold">Create Your Profile</h1>
          <div className="flex gap-4">
            <div className="flex flex-col w-1/3">
              <label className="font-thin mb-1 uppercase text-sm">Personal Information</label>
              <div className="flex flex-col gap-4">
                <input
                  placeholder="First Name"
                  type="text"
                  className="shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                  name="email"
                />
                <input
                  placeholder="Middle Name"
                  type="text"
                  className="shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                  name="email"
                />
                <input
                  placeholder="Last Name"
                  type="text"
                  className="shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                  name="email"
                />
                <div className="mt-4 flex flex-col gap-2">
                  <label className="font-thin mb-1 uppercase text-sm">Date of Birth</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<CustomInput />}
                    dateFormat="dd-MM-yyyy"
                    popperPlacement="bottom"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/3 flex gap-2 flex-col">
              <TextareaField
                label="Bio"
                name="bio"
                value={bio}
                onChange={setBio}
                rows={5}
                cols={4}
                placeholder="Bio"
              />
              <div className="mt-7">
                <div className="flex gap-1 mb-2">
                  <label className="text-sm text-[#616161] font-thin">INTERESTS</label>
                  <Image
                    onClick={() => setModalOpen(true)}
                    src={'/svgs/add_box.svg'}
                    className="cursor-pointer"
                    alt="add Interest"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex gap-1 flex-wrap">
                  {interests.map((item, ind) => (
                    <span
                      className="flex gap-1 bg-[#D9D9D9] px-2 py-[0.15rem] text-sm rounded-lg items-center"
                      key={ind}
                    >
                      <Image
                        src={'/svgs/close.svg'}
                        width={15}
                        height={15}
                        alt="close"
                        className="cursor-pointer self-end"
                      />
                      {item}{' '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-16">
              <div>
                <label className=" font-thin mb-1 uppercase text-sm">Display Name</label>
                <input
                  placeholder="Choose a Display Name"
                  type="text"
                  className="shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] w-full rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
                  name="email"
                />
              </div>
              <div>
                <div className="flex items-end gap-4">
                  <Image src={'/svgs/accountcircle.svg'} width={60} height={60} alt="account" />
                  <p className="w-1/2 text-[0.78rem] text-[#616161]">File must be min. 140x140px</p>
                </div>
                <button className="bg-[#1C8827] mt-4 text-white py-1 px-3">Upload Image</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-2 ">
          <button className="text-[#1850BC] w-full py-1 text-center border-2 border-[#1850BC] font-medium rounded-md">
            Continue As User
          </button>
          <button className="text-black text-center py-1 w-full border-2 border-black font-medium rounded-md">
            Continue as an Expert
          </button>
        </div>
      </div>
      <Modal
        isOpen={modelOpen}
        onClose={() => setModalOpen(false)}
        handleModalSubmit={handleModalSubmit}
        modalType={'Interests'}
      />
    </div>
  );
};

const CustomInput = ({ value, onClick }) => (
  <div
    className="shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] flex justify-between items-center rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
    onClick={onClick}
  >
    {value ? (
      value
    ) : (
      <label className="text-gray-400 mb-1 uppercase text-sm">Select Birthdate</label>
    )}
    <span className="ml-2 mt-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 00-.707 1.707l3.182 3.182H3a1 1 0 100 2h9.475l-3.182 3.182a1 1 0 101.414 1.414l5.001-5a1.002 1.002 0 000-1.414l-5-5A1 1 0 0010 2z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
);
