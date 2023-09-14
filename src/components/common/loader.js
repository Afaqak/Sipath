import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ClipLoader } from 'react-spinners';

export const Loader = ({ message, subMessage }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-100" />

      <div className="bg-white p-6 rounded-lg w-64 shadow-lg text-center z-20">
        <ClipLoader loading={true} color={'#1850BC'} size={40} />
        <p className="text-xl font-semibold mt-4">{message}</p>
        <p className="text-gray-600 text-sm mt-2">{subMessage}</p>
      </div>
    </Dialog>
  );
};
