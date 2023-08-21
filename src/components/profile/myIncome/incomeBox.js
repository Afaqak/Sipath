'use client';
import { CashOutPopup } from '@/components/popups/cashOutPopup';
import { useState } from 'react';
export const IncomeBox = () => {
  const [cashOutPopup, setCashOutPopup] = useState(false);
  return (
    <div className="flex justify-between md:flex-row flex-col gap-5 md:items-center  p-5 rounded-md w-full shadow-md bg-white mt-8">
      <div className="flex gap-10 text-center md:text-left">
        <div>
          <h1 className="md:text-4xl text-2xl font-bold">$4.325,32</h1>
          <p className="md:text-xl">Total Revenue</p>
        </div>
        <div>
          <h1 className="md:text-4xl text-2xl font-bold">$456,67</h1>
          <p className="md:text-xl">Available Withdrawal</p>
        </div>
      </div>
      <button
        onClick={() => setCashOutPopup(!cashOutPopup)}
        className="px-16 text-[#1C8827] rounded-md shadow-md border-2 py-1 border-[#1C8827] "
      >
        Cash Out
      </button>
      {cashOutPopup && <CashOutPopup close={() => setCashOutPopup(false)} />}
    </div>
  );
};
