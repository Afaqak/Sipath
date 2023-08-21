import React from 'react';

export const AddCardPopup = ({ close }) => {
  return (
    <div className="fixed top-0 left-0 overflow-hidden z-[1000] bg-gray-100 w-full h-full flex items-center justify-center ">
      <div className="md:flex-row flex-col flex gap-8 p-10 bg-white rounded-md shadow-md w-fit">
        {/*side--------------1*/}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">CARD DETAILS</h1>
          {/*Name on card*/}
          <div className="flex flex-col">
            <label className="text-sm">NAME ON CARD</label>
            <input
              type="mt-1 text"
              placeholder="Enter Name"
              className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] w-fit rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">CARD NUMBER</label>
            <input
              type="mt-1 number"
              placeholder="0000-0000-0000-0000"
              className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] w-fit rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
            />
          </div>
          <div className="flex">
            {/*expiration date*/}
            <div className="flex gap-4 mb-6">
              <div className="flex flex-col">
                <label className="text-sm">EXPIRATION DATE</label>
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="mt-1 shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] w-16 placeholder:text-center rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
                      placeholder="MM"
                    />
                    <input
                      className="mt-1 shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] w-16 placeholder:text-center rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
                      type="number"
                      placeholder="YY"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm">SECURITY CODE</label>
                <input
                  type="number"
                  className="mt-1 shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] w-16 placeholder:text-center rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
                  placeholder="0000"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:mt-0 gap-2">
            <button className="py-1 w-full md:w-fit px-4 border-[#1C8827] text-[#1C8827] font-semibold shadow-md rounded-md border-2">
              Add Card
            </button>
            <button
              onClick={close}
              className="py-1 px-4 w-full md:w-fit border-[#FB3C22] text-[#FB3C22] font-semibold shadow-md rounded-md border-2"
            >
              Cancel
            </button>
          </div>
        </div>

        {/*side--------------2*/}
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">BILLING INFORMATION</h1>
          <div className="flex flex-col">
            <label className="text-sm">BILLING ADDRESS</label>
            <input
              className="mt-1 shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
              type="text"
              placeholder="Enter Address"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">COUNTRY</label>
            <input
              className="mt-1 shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
              type="text"
              placeholder="Select"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">STATE/PROVINCE</label>
            <input
              className="mt-1 shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
              type="text"
              placeholder="Enter Address"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">CITY</label>
            <input
              className="mt-1 shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] w-full rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
              type="text"
              placeholder="Enter Address"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">POSTALCODE/ZIP CODE</label>
            <input
              className="mt-1 shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
              type="number"
              placeholder="Enter CODE"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
