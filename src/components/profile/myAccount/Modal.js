'use client';
import React, { useState } from 'react';

export const Modal = ({ isOpen, onClose, handleModalSubmit, modalType }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleModalSubmit(inputValue);
    setInputValue('');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
          <form onSubmit={handleSubmit} className="bg-white w-[35%] px-8 py-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-8 text-center">{modalType}</h2>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              className="placeholder:text-sm py-1 px-2 w-full focus:outline-none border rounded-md focus:ring focus:ring-indigo-200"
              placeholder={`Enter ${modalType}`}
            />
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 ml-2 text-sm font-medium bg-main text-white bg-primary rounded-md hover:bg-primary-dark"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
