'use client';
import { useState } from 'react';
export function PasswordInput({ placeholder, name, disabled, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm w-full border-none focus:outline-none"
        name={name}
      />
      <div
        className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M0 10s4-5 10-5 10 5 10 5-4 5-10 5-10-5-10-5zm9-3a1 1 0 0 0-.707.293l-3 3a1 1 0 0 0 1.414 1.414L9 8.414l2.293 2.293a1 1 0 0 0 1.414-1.414l-3-3A1 1 0 0 0 9 7z"
            />
            <path
              fillRule="evenodd"
              d="M17.646 17.646a1 1 0 0 0 0-1.414l-15-15a1 1 0 0 0-1.414 1.414l15 15a1 1 0 0 0 1.414 0z"
            />
          </svg>
        ) : (
          <img src={'/svgs/eye.svg'} alt="Hide Password" className="h-4 w-4" />
        )}
      </div>
    </div>
  );
}
