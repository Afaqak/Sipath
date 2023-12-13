'use client'
import React, { useState, useEffect } from 'react';
import {
  IncomePerMedia,
  IncomeBox,
  PaymentMethods,
  PaymentOption,
  MediaPagination,
} from '@/components';
import useAxios from '@/hooks/useAxios';
import { useSession } from 'next-auth/react';

export const MyIncome = () => {
  const { data: user } = useSession()
  const axios = useAxios()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getUserEarnings =async () => {

      try {
        const response =await axios.get('/users/earnings', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        })
      console.log(response?.data)
        setTotal(response?.data?.total)
      } catch (err) {
        console.log(err)
      }
    }
    getUserEarnings()
  }, [])


  return (
    <div className="pb-16 overflow-visible  relative mx-auto">
      <IncomeBox total={total}/>
      <PaymentMethods />
      <PaymentOption />
      <IncomePerMedia />
      <div className="flex-grow">
        <MediaPagination />
      </div>
    </div>
  );
};
