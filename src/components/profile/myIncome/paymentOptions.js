'use client';
import { useState } from 'react';
export const PaymentOption = () => {
  return (
    <div className="mt-6 w-[80%]">
      <form className="flex justify-between">
        <Dropdown
          label="Default Payment Options"
          open="Default Payment Options"
          options={['Physics', 'Chemistry']}
        />
        <Dropdown
          label="Default Cash Out Options"
          open="Default Cash Out Options"
          options={['Option 1', 'Option 2', 'Option 3']}
        />
      </form>
    </div>
  );
};

const Dropdown = ({ label, options, open }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <button
        onClick={toggleDropdown}
        className="text-[#616161] bg-white relative py-[0.35rem] justify-between shadow-[inset_2px_2px_7px_rgba(0,0,0,0.1)] focus:outline-none font-medium rounded-md text-sm px-3 text-center inline-flex items-center w-full md:w-48"
        type="button"
      >
        {selectedOption || 'Select'}
        <svg
          className={`w-2.5 h-2.5 ml-2.5 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            fill="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        {isOpen && open === label && (
          <div className="z-10 absolute top-9 left-0 w-full  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </button>
    </div>
  );
};
