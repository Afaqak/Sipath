'use client';
import React, { useState } from 'react';
import { Modal, AvailableDays, Loader } from '@/components';
import Image from 'next/image';
import { onBoardTutor } from '@/features/onBoard/onBoardThunk';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
const OnBoardingExpert = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [expertise, setExpertise] = useState([]);
  const [modelOpen, setModalOpen] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(0);
  const handleModalSubmit = (val) => {
    setExpertise([...expertise, val]);
    setModalOpen(false);
  };
  const [availability, setAvailability] = useState([]);

  const onSuccess = () => {
    toast({
      title: 'Congratulations!',
      description: 'You are a tutor now',
    });
    setLoading(false);
    router.push('/');
  };

  const onError = (error) => {
    toast({
      title: 'Oops! Something went wrong. 😞',
      variant: 'destructuve',
    });

    console.error('Error creating user:', error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hourlyRate) return;
    try {
      setLoading(true);
      const formData = {
        hourly_rate: hourlyRate,
        expertise: [1, 6, 2],
        availability,
      };

      dispatch(onBoardTutor({ formData, onSuccess, onError }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-[90vh] items-center justify-center flex">
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
                <div className="flex gap-1">
                  <label className="text-[#616161] font-thin text-sm">EXPERTISE</label>
                  <Image
                    onClick={() => setModalOpen(true)}
                    src={'/svgs/add_time_purple.svg'}
                    className={`cursor-pointer`}
                    alt="add Interest"
                    width={20}
                    height={20}
                  />
                </div>
                <div className=" flex gap-1 flex-wrap mt-1">
                  {expertise.map((item, ind) => (
                    <span
                      className="flex gap-1 bg-[#D9D9D9] px-2 py-[0.15rem] text-sm rounded-lg items-center"
                      key={ind}
                    >
                      <Image
                        src={'/svgs/close.svg'}
                        width={15}
                        height={15}
                        alt="close"
                        className="cursor-pointer self-end"
                      />
                      {item}{' '}
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
            <Button
              isLoading={loading}
              className={`flex items-center gap-2 ${loading ? 'bg-black text-white' : ''}`}
            >
              Complete
            </Button>
          </div>
        </form>

        <Modal
          isOpen={modelOpen}
          onClose={() => setModalOpen(false)}
          handleModalSubmit={handleModalSubmit}
          modalType={'Expertise'}
        />
      </div>
    </>
  );
};

export default OnBoardingExpert;
