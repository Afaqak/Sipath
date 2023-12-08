import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import Image from 'next/image';

export const SuccessfullPurchaseModal = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog onOpenChange={() => setIsOpen(false)} open={isOpen}>
      <DialogContent className="bg-white shadow-md sm:max-w-[425px] max-h-[60vh] flex items-center justify-center flex-col overflow-y-auto text-center p-6">
        <DialogHeader className={'flex justify-center'}>
          <Image src={'/checkGif.gif'} width={100} height={100} />
        </DialogHeader>
        <div className="mt-2">
          <p className="text-lg font-semibold">Purchase Was Successful!</p>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Enjoy your content!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};


