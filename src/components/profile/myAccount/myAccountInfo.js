'use selector';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const MyAccountInfo = ({ setEdit }) => {
  const user = useSelector((state) => state.userAuth.user);
  return (
    <div>
      <div className="flex gap-4 flex-col mt-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="grid-cols-2 md:grid-cols-3 lg:grid-cols-1 grid  gap-4 lg:w-[25%]">
            <div>
              <label className="text-sm font-thin">First Name</label>
              <h2 className=" text-lg">{user?.first_name}</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Last Name</label>
              <h2 className=" text-lg">{user?.last_name}</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Account Name</label>
              <h2 className=" text-lg">{user?.display_name}</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Email Address</label>
              <h2 className=" text-lg">{user?.email}</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Phone Number</label>
              <h2 className=" text-lg">**********12</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Website</label>
              <h2 className="text-lg">www.example.com</h2>
            </div>
          </div>

          <div className="lg:w-1/3 grid grid-cols-3 lg:grid-cols-1 border-l border-[#D9D9D9] pl-6 md:pl-10 gap-6">
            <div className="">
              <label className="text-sm font-thin">Hourly Rate</label>
              <h2 className=" text-lg">25$/hr</h2>
            </div>
            <div>
              <label className="text-sm font-thin">Expertise</label>
              <ul className=" list-disc">
                <li>MATH</li>
                <li>PHYSICS</li>
                <li>CHEMISTRY</li>
              </ul>
            </div>
            <div>
              <label className="text-sm font-thin">Interests</label>
              <ul className=" list-disc">
                <li>MATH</li>
                <li>PHYSICS</li>
                <li>CHEMISTRY</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-8 border-l border-[#D9D9D9] pl-6 md:pl-10 lg:w-2/5 ">
            <div>
              <label className="text-sm font-thin">Bio</label>
              <p className="text-lg">{user?.bio}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between">
                <div className="flex w-[50%] justify-between">
                  <h2 className="text-[#CF47FF]">Instagram</h2>
                  <p>@theTeacher</p>
                </div>
                <div className="flex gap-2">
                  <Image src={'/svgs/linked.svg'} width={15} height={15} alt="linked" /> Linked
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex w-[50%] justify-between">
                  <h2 className="text-[#1850BC]">Twitter</h2>
                  <p>@theTeacher</p>
                </div>
                <div className="flex gap-2">
                  <Image src={'/svgs/linked.svg'} width={15} height={15} alt="linked" /> Linked
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex w-[50%] justify-between">
                  <h2 className="text-[#0024DD]">Facebook</h2>
                  <p className="text-center">__</p>
                </div>
                <div className="flex gap-2">
                  <Image src={'/svgs/notlinked.svg'} width={15} height={15} alt="linked" /> Not
                  Linked
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex w-[50%] justify-between">
                  <h2 className="text-[#203A60]">LinkedIn</h2>
                  <p>@theTeacher</p>
                </div>
                <div className="flex gap-2">
                  <Image src={'/svgs/linked.svg'} width={15} height={15} alt="linked" /> Linked
                </div>
              </div>
            </div>
            <div className="flex items-end justify-end flex-grow">
              <button
                onClick={() => setEdit(true)}
                className="px-6 py-1 flex w-fit  self-end  border-[#1C8827] text-[#1C8827] font-medium border-2 rounded-md shadow-md"
              >
                Edit Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
