import React, { useState } from 'react';
import {
  IncomePerMedia,
  IncomeBox,
  PaymentMethods,
  PaymentOption,
  MediaPagination,
} from '@/components';

export const MyIncome = () => {
  return (
    <div className="pb-16 overflow-visible  relative mx-auto">
      <IncomeBox />
      <PaymentMethods />
      <PaymentOption />
      <IncomePerMedia />
      <div className="flex-grow">
        <MediaPagination />
      </div>
    </div>
  );
};
