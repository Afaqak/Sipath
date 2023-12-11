import React, { useRef, useState, forwardRef } from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Button } from '../ui/button';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Icons } from '../icons';
import { useSession } from 'next-auth/react';
import useAxios from '@/hooks/useAxios';
import { successToast, errorToast } from '@/utils/toasts';
import { validateInput } from '@/utils';

export function AppointmentRequestModal({ isOpen, setIsOpen, chatId }) {
  const [fromTime, setFromTime] = useState(null);
  const [loading, setLoading] = useState(false)
  const { data: user } = useSession()
  const [untilTime, setUntilTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const ref = useRef(null);
  const axios = useAxios()
  const dateRef = useRef(null);

  function closeModal() {
    setIsOpen(false);
  }


  useOutsideClick(ref, () => closeModal());


  async function sendRequest() {
    const from = fromTime ? fromTime.format('hh:mm A') : '';
    const until = untilTime ? untilTime.format('hh:mm A') : '';
    const selectedDateFormatted = moment(selectedDate).format('YYYY-MM-DD');

    const fields = [
      { value: from, label: 'From' },
      { value: until, label: 'Until' },
      { value: selectedDateFormatted, label: 'Date' },
    ];

    if (!validateInput(fields)) {
      return;
    }

    const fromTimeFormatted = `${selectedDateFormatted}T${moment(from, 'hh:mm A').format('HH:mm:ss')}`;
    const untilTimeFormatted = `${selectedDateFormatted}T${moment(until, 'hh:mm A').format('HH:mm:ss')}`;

    const request = {
      from: fromTimeFormatted,
      to: untilTimeFormatted,
    };
    setLoading(true)
    try {
      const response = await axios.post(`/chats/${chatId}/appointments`, request, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      console.log(response.data, "{response.data}")
      setTimeout(() => {
        successToast("Sent Appointment Request!")
      }, 200)
      closeModal()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`fixed inset-0 overflow-y-auto z-[100000] transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-100" />
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          ref={ref}
          className={`inline-block relative z-[5000] align-bottom bg-white rounded-lg p-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isOpen ? 'scale-100' : 'scale-90'
            }`}
        >
          <h2 className="text-xl font-semibold mb-4">Appointment Request</h2>
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <div className="bg-white">
                <div className="mb-2 ">
                  <div className="flex mb-2 gap-3">
                    <div className="w-[5.4rem]">
                      <TimePicker
                        value={fromTime}
                        onChange={setFromTime}
                        className="w-full z-[5000] !relative custom-time-picker text-sm"
                        format="hh:mm A"
                        use12Hours
                        placeholder="From"
                        showSecond={false}
                        clearIcon={false}
                      />
                    </div>
                    <div className="w-[5.4rem]">
                      <TimePicker
                        value={untilTime}
                        onChange={setUntilTime}
                        className="w-full custom-time-picker text-sm flex"
                        format="hh:mm A"
                        use12Hours
                        placeholder="Until"
                        showSecond={false}
                        clearIcon={false}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col '>
                    <label className=" text-subcolor3 font-thin uppercase whitespace-nowrap text-sm">Select Appointment Date</label>
                    <input onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} type='date' placeholder='Select Appointment Date' className='placeholder:text-sm py-2 resize-none cursor-pointer focus:outline-none shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] px-4 rounded' />
       
                  </div>
                </div>
                <div className="">
                  <button
                    disabled={loading}
                    type="button"
                    onClick={sendRequest}
                    className="mt-2 inline-flex gap-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {loading &&
                      <div className='animate-spin'>
                        <Icons.Loader2 className=" stroke-blue-900" /></div>}

                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-3 w-full flex justify-end ">
            <Button className="bg-black" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


// const CustomInput = forwardRef(({ value, onClick }, ref) => {

//   return(
//   <div
//     className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] w-fit flex justify-between items-center rounded-md px-4 py-1 text-sm placeholder:text-sm border-none focus:outline-none"
//     onClick={onClick}
//   >
//     {value ? (
//       <span className="">{value}</span>
//     ) : (
//       <label className="text-gray-400 uppercase whitespace-nowrap text-sm">Select Appointment Date</label>
//     )}
//     <span className="ml-2 mt-1">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5 text-gray-500"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path
//           fillRule="evenodd"
//           d="M10 2a1 1 0 00-.707 1.707l3.182 3.182H3a1 1 0 100 2h9.475l-3.182 3.182a1 1 0 101.414 1.414l5.001-5a1.002 1.002 0 000-1.414l-5-5A1 1 0 0010 2z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </span>
//     <input ref={ref} type="text" style={{ display: 'none' }} />
//   </div>
//   )
//     });

