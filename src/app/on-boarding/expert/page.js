'use client';
import React, { useEffect, useRef, useState } from 'react';
import {AvailableDays } from '@/components';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { successToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
const OnBoardingExpert = () => {
  const { data: user, update } = useSession();
  const axios = useAxiosPrivate();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modelOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [expertise, setExpertise] = useState([])
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/categories');
      
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);



  const onSuccess = () => {
    successToast('Congratulations! You are a tutor now.');
    setLoading(false);
    router.push('/');
  };

  const handleExpertise = (experty, index) => {
    const expertiseIndex = expertise.findIndex((exp) => exp.id === experty.id);

    if (expertiseIndex === -1) {
      setExpertise([...expertise, { id: experty.id, experty: experty.category }]);
    } else {

      const updatedExpertise = [...expertise];
      updatedExpertise.splice(expertiseIndex, 1);
      setExpertise(updatedExpertise);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hourlyRate) return;
    try {
      setLoading(true);
      const formData = {
        hourly_rate: hourlyRate,
        expertise: expertise?.map(exp => exp?.id),
        availability,
      };

      console.log(formData,"{before submission}")

      // const response = await axios.post('/onboard/tutor', formData, {
      //   headers: {
      //     Authorization: `Bearer ${user?.token}`,
      //   },
      // });

      // if (response.data) {
       
      //   const newSession = {
      //     ...user,
      //     user: {
      //       ...user.user,
      //       user: { isTutor: true, ...response.data },
      //     },
      //   };
      //   await update(newSession);
      //   onSuccess();
      // }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-[90vh] my-2 items-center justify-center flex">
        <form
          onSubmit={handleSubmit}
          className="p-7 min-h-[70vh] rounded-lg shadow-lg bg-white w-[70%] flex flex-col gap-2"
        >
          <h1 className="font-semibold text-lg">Complete Your Profile!</h1>
          <div>
            <div className="flex gap-2 ">
              <div className="flex flex-col w-fit">
                <label className="font-thin mb-1 uppercase text-sm">HOURLY RATE</label>
                <input
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="Enter Amount"
                  type="text"
                  className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-2 py-1 placeholder:text-sm border-none focus:outline-none"
                  name="hourlyRate"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 relative">
                  <label className="text-[#616161] font-thin text-sm">SELECT EXPERTISE</label>


                </div>
                <div className=" flex gap-1 flex-wrap mt-1 w-[65%]">
                  {categories.map((item, ind) => (
                    <span
                      onClick={() => handleExpertise(item, ind)} 
                      className={`flex gap-1 rounded-lg px-2 py-[0.15rem] text-sm items-center cursor-pointer border ${expertise.some((exp) => exp.id === item.id) ? 'bg-[#D9D9D9]  text-black' : ''
                        }`}
                    >
                      {item.category}{' '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2 ">
              <h2 className="text-[#616161] font-thin">Availability</h2>
              <AvailableDays setAvailability={setAvailability} />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center rounded-md px-8 py-1 gap-2 ${loading ? 'bg-black text-white' : 'border-2 border-black text-black'
                }`}
            >
              Complete
            </button>
          </div>
        </form>

      </div>
    </>
  );
};

export default OnBoardingExpert;


export const MultipleExpertiseModal = ({ isOpen, onClose, setExpertise, expertise }) => {
  const axios = useAxiosPrivate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/categories');

        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <ul
        className={`transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} absolute top-4 left-0 options grid grid-cols-2 z-10 mt-2 w-56 bg-white border border-gray-300  rounded-md shadow-md`}
      >
        {categories.map((option) => (
          <li
            onClick={() => {
              const expertiseId = option?.id;
              const expertiseCategory = option?.category;
              const isExpertiseSelected = expertise.some((exp) => exp.id === expertiseId);

              if (!isExpertiseSelected) {
                setExpertise([...expertise, { id: expertiseId, experty: expertiseCategory }]);
              }
            }}
            key={option.id}
            className={`py-2 px-4 selectedSubject cursor-pointer shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] ${expertise.some((exp) => exp.id === option.id) ? 'bg-main text-white' : ''
              }`}
          >
            {option.category}
          </li>
        ))}
      </ul>
    </div>
  );
};



