import React from 'react';

export const CashOutPopup = ({ close }) => {
  return (
    <div className="fixed top-0 left-0 overflow-hidden z-[1000] bg-gray-100 w-full h-full flex items-center justify-center ">
      <div className="md:flex-row flex-col flex gap-8 p-6 bg-white rounded-md shadow-md w-fit">
        <div>
          <div>
            <label className="text-[0.70rem] uppercase font-light">Available for Withdrawl</label>
            <h2 className="text-xl font-bold">$456,67</h2>
          </div>
          <div>
            <label className="text-[0.70rem] flex gap-4 items-center uppercase font-light">
              Selected Payment Method
            </label>
            <div className="flex gap-4 mb-4 items-center">
              <span className="font-bold text-xl">Card</span>
              <span className="text-sm font-semibold">Number ends in **** **** **** **32</span>
            </div>
          </div>
          <div>
            <label className="text-[0.70rem] uppercase font-light">Personal Details</label>
            <h2 className="font-bold text-sm">John Doe</h2>
            <h2 className="font-bold text-sm">Bank of England</h2>
            <h2 className="font-bold text-sm">Baker Street</h2>
          </div>
        </div>
        <div className="flex md:mt-0 gap-2 items-end">
          <button className="py-1 w-full md:w-fit px-4 border-[#1C8827] text-[#1C8827] font-semibold shadow-md rounded-md border-2">
            Cash Out
          </button>
          <button
            onClick={close}
            className="py-1 px-4 w-full md:w-fit border-[#FB3C22] text-[#FB3C22] font-semibold shadow-md rounded-md border-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
