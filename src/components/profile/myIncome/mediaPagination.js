'use client';
import React, { useState } from 'react';

export const MediaPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {/* Your content */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const range = 1; // Number of pages to display on each side of the current page
    const start = Math.max(1, currentPage - range);
    const end = Math.min(totalPages, currentPage + range);

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex text-sm items-center justify-center mt-4">
      {currentPage > 1 && (
        <button
          className="px-2 py-1 text-[#616161] font-bold"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-2 py-1 font-bold text-sm mx-1 ${
            pageNumber === currentPage ? 'text-[#FBA422]' : 'text-black'
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className="px-2 py-1 text-black font-bold"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};
