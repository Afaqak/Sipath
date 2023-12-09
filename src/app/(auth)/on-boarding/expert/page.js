'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AvailableDays, Icons } from '@/components';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { successToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

const OnBoardingExpert = () => {
  const { data: user, update } = useSession()
  const axios = useAxiosPrivate();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [expertise, setExpertise] = useState([])
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let initialSchedule = {};
  daysOfWeek.forEach((day) => {
    initialSchedule[day] = [{ from: 0, until: 0 }];
  });
  const [isMounted, setIsMounted] = useState(false)

  const [schedule, setSchedule] = useState(initialSchedule);


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
    console.log(experty)
    const expertiseIndex = expertise.findIndex((exp) => exp.id === experty.id);

    if (expertiseIndex === -1) {
      setExpertise([...expertise, { id: experty.id, experty: experty.category }]);
    } else {

      const updatedExpertise = [...expertise];
      updatedExpertise.splice(expertiseIndex, 1);
      setExpertise(updatedExpertise);
    }
  };

  const formatScheduleData = () => {
    const availability = [];
    daysOfWeek.forEach((day) => {
      schedule[day].forEach((slot) => {
        if (slot.from && slot.until) {
          availability.push({
            day: day?.toLowerCase(),
            from: slot.from.format('HH:mm:ss'),
            to: slot.until.format('HH:mm:ss'),
          });
        }
      });
    });
    return availability
  };

  console.log(expertise)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hourlyRate) return;
    const availability = formatScheduleData()

    try {
      setLoading(true);
      console.log(expertise)
      const formData = {
        hourly_rate: hourlyRate,
        expertise: expertise?.map(exp => exp?.id),
        avaliability: availability,
      };


      console.log(formData)

      const response = await axios.post('/onboard/tutor', formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.data) {

        await update({
          ...user,
          user:{
          user: response?.data.user,
          tutor: response?.data?.tutor,
          slots: response?.data?.slots
          }
        });
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setIsMounted(true), [])

  return (
    <>
      <div className="my-6 items-center justify-center flex uppercase">
        <form
          onSubmit={handleSubmit}
          className="p-7 min-h-[70vh]  rounded-lg box-shadow-main  bg-white w-[70%] flex flex-col gap-2"
        >
          <h1 className="font-semibold text-lg mb-2">Complete Your Profile!</h1>
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
                <div className={`${!isMounted ? 'justify-center items-center w-full' : 'w-[65%]'} flex gap-1 flex-wrap mt-1  `}>

                  {!isMounted ? <Icons.colorLoader className={'h-[20px] flex w-[20px] mt-2'} height='' /> :
                    categories.map((item, ind) => (
                      <span
                        key={ind}
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
              <AvailableDays setSchedule={setSchedule} schedule={schedule} />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              variant="outline"
              disabled={loading}
              className={`flex items-center border-black border-2 py-1 w-44 justify-center font-medium rounded-md px-8 gap-2 
                }`}
            >
              {loading && <span className='w-4 h-4 animate-spin'><Icons.Loader2 stroke="black" className="w-4 h-4" /></span>}
              Complete
            </button>
          </div>
        </form>

      </div>
    </>
  );
};

export default OnBoardingExpert;


