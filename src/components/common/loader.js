import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

export const Loader = ({ message, subMessage }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return <div></div>;
};
