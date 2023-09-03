'use client';
import React, { useState } from 'react';
import { Modal, AvailableDays } from '@/components';
import Image from 'next/image';

const OnBoardingExpert = () => {
  const [expertise, setExpertise] = useState([]);
  const [modelOpen, setModalOpen] = useState(false);
  const handleModalSubmit = (val) => {
    setExpertise([...expertise, val]);
    setModalOpen(false);
  };

  return (
    <div className="h-[90vh] items-center justify-center flex">
      <div className="p-7 min-h-[70vh] rounded-lg shadow-lg bg-white w-[70%] flex flex-col gap-2">
        <h1 className="font-semibold text-lg">Complete Your Profile!</h1>
        <div>
          <div className="flex gap-2 ">
            <div className="flex flex-col w-fit">
              <label className="font-thin mb-1 uppercase text-sm">HOURLY RATE</label>
              <input
                placeholder="Enter Amount"
                type="text"
                className="shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] rounded-md px-2 py-1 placeholder:text-sm border-none focus:outline-none"
                name="email"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1">
                <label className="text-[#616161] font-thin">EXPERTISE</label>
                <Image
                  onClick={() => setModalOpen(true)}
                  src={'/svgs/add_box.svg'}
                  className="cursor-pointer"
                  alt="add Interest"
                  width={20}
                  height={20}
                />
              </div>
              <div className=" flex gap-1 flex-wrap mt-1">
                {expertise.map((item, ind) => (
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
          <div className="mt-2 ">
            <h2 className="text-[#616161] font-thin">Availability</h2>
            <AvailableDays />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modelOpen}
        onClose={() => setModalOpen(false)}
        handleModalSubmit={handleModalSubmit}
        modalType={'Expertise'}
      />
    </div>
  );
};

export default OnBoardingExpert;
