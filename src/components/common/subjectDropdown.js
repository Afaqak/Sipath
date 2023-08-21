'use client';
import React, { useRef, useEffect } from 'react';

export const SubjectDropdown = ({ dropDown, setDropDown }) => {
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
        className="text-[#616161] relative py-[0.35rem]  justify-between shadow-[inset_2px_2px_7px_rgba(0,0,0,0.1)] focus:outline-none font-medium  rounded-md text-sm px-3 text-center inline-flex items-center w-full md:w-48"
        type="button"
      >
        Select Subject
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
              <li className="block px-4 py-2 hover:bg-gray-100">Physics</li>
              <li className="block px-4 py-2 hover:bg-gray-100 ">Chemistry</li>
              <li className="block px-4 py-2 hover:bg-gray-100 ">Mathematics</li>
              <li className="block px-4 py-2 hover:bg-gray-100">Psychology</li>
              <li className="block px-4 py-2 hover:bg-gray-100">Coding</li>
              <li className="block px-4 py-2 hover:bg-gray-100">Art</li>
              <li className="block px-4 py-2 hover:bg-gray-100">Biology</li>
              <li className="block px-4 py-2 hover:bg-gray-100">English</li>
              <li className="block px-4 py-2 hover:bg-gray-100">Literature</li>
            </ul>
          </div>
        )}
      </button>
    </div>
  );
};
