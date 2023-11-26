import { forwardRef } from "react";
export const CustomRcInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] flex justify-between items-center rounded-md px-4 py-2 placeholder:text-sm border-none focus:outline-none"
      onClick={onClick}
    >
      {value ? (
        <span className="">{value}</span>
      ) : (
        <label className="text-gray-400 uppercase text-sm">Select Birthdate</label>
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
      <input ref={ref} type="text" style={{ display: 'none' }} />
    </div>
  ));
  