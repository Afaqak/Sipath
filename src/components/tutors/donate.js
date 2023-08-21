'use client';
import React, { useState, useEffect, useRef } from 'react';

import Image from 'next/image';

export const Donate = ({ setDonate }) => {
  const [dropDown, setDropDown] = useState(null);

  return (
    <div className=" fixed z-[2000] top-0 left-0 backdrop-blur-sm h-screen w-screen flex items-center justify-center">
      <div className="bg-white gap-3 flex flex-col p-4 w-[80%] md:w-fit shadow-lg rounded-lg">
        <h1 className="font-bold">DONATE TO ACCOUNT</h1>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col">
            <label className="text-[#616161] font-light">Donation Amount</label>
            <input
              type="number"
              placeholder="0000"
              className="w-1/3 px-2 focus:outline-none border-none py-1 rounded-md shadow-[inset_2px_3px_10px_rgba(0,0,0,0.1)]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#616161] font-light">Payment Method</label>
            <DropDown dropDown={dropDown} setDropDown={setDropDown} />
          </div>
        </div>
        <button className="font-semibold w-full text-[#1C8827] justify-center flex items-center gap-1 px-8 rounded-md border-[3px] border-[#1C8827] py-1">
          <Image width={20} height={20} src={'/svgs/coins.svg'} />
          <span>Donate</span>
        </button>
        <button onClick={() => setDonate(false)} className="font-semibold">
          Cancel
        </button>
      </div>
    </div>
  );
};

function DropDown({ dropDown, setDropDown }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false); // Close the dropdown when clicking outside
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [setDropDown]);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setDropDown(!dropDown)}
        id="dropdownHoverButton"
        className="text-[#616161] relative py-1 justify-between shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] focus:outline-none font-medium rounded-lg text-sm px-3 text-center inline-flex items-center w-full md:w-52"
        type="button"
      >
        select
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            fill="black"
            strokeLinecapsss="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        {dropDown && (
          <div
            id="dropdownHover"
            className="z-10 absolute top-9 left-0 w-full bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHoverButton"
            >
              <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Dashboard
              </li>
              <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Settings
              </li>
              <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Earnings
              </li>
              <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Sign out
              </li>
            </ul>
          </div>
        )}
      </button>
    </div>
  );
}
