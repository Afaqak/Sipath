'use client';
import { useState } from 'react';
import Image from 'next/image';
import { AddCardPopup } from '@/components/popups/addCardPopup';
export const PaymentMethods = () => {
  const [openAddCardPopup, setOpenAddCardPopup] = useState(false);
  const cardNumber = '43682384932432832843';
  const fixedCardNumber = cardNumber.slice(cardNumber.length - 2).padStart(cardNumber.length, '*');

  return (
    <div className="mt-4">
      <h1 className="font-medium text-lg mb-2">Payment Methods</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-white flex items-center rounded-md shadow-md justify-center min-h-[25vh]">
          <Image src={'/paypal.png'} width={150} height={150} alt="paypal" />
        </div>
        <div className="bg-white flex rounded-md flex-col items-center justify-center shadow-md min-h-[25vh]">
          <div className="flex flex-col">
            {' '}
            <span className="font-semibold">My Card</span>
            <span>Number ends in {fixedCardNumber}</span>
          </div>
        </div>
        <div className="bg-white flex rounded-md flex-col items-center justify-center shadow-md min-h-[25vh]">
          <div onClick={() => setOpenAddCardPopup(!openAddCardPopup)} className="flex flex-col">
            {' '}
            <span>Change Card</span>
          </div>
        </div>
      </div>
      {openAddCardPopup && <AddCardPopup close={() => setOpenAddCardPopup(false)} />}
    </div>
  );
};
