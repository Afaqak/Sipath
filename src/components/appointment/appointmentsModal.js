import React, { useRef, useState, forwardRef, useEffect } from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Button } from '../ui/button';
import { useOutsideClick } from '@/hooks/useOutsideClick'
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../icons';
import { useSession } from 'next-auth/react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { successToast, errorToast } from '@/utils/toasts';
import { validateInput } from '@/utils';

import { approveAppointmentRequest, fetchAppointments, fetchReceivedAppointmentRequests,rejectAppointmentRequest, fetchSentAppointmentsRequests } from '@/features/appointments/appointmentThunk';

export function AppointmentsModal({ isOpen, setIsOpen, token }) {
  const [loading, setLoading] = useState(false);
  const { data: user } = useSession();
  const receivedAppointmentRequests = useSelector(state => state.appointments.receivedAppointmentRequests)
  const sentAppointmentRequests = useSelector(state => state.appointments.sentAppointmentRequests)
  const appointmentRequests = useSelector(state => state.appointments.appointmentRequests)
  
  const dispatch = useDispatch();
  const ref = useRef(null);
  const axios = useAxiosPrivate();
  const dateRef = useRef(null);
  const [activeTab, setActiveTab] = useState('received');

  const handleAcceptAppointmentRequest=(id)=>{

    dispatch(approveAppointmentRequest({id,token})) 
  }

  const handleRejectAppointmentRequest=(id)=>{
 
    dispatch(rejectAppointmentRequest({id,token})) 
  }


  useEffect(() => {
    dispatch(fetchReceivedAppointmentRequests({ token }))
    dispatch(fetchAppointments({ token }))
    dispatch(fetchSentAppointmentsRequests({ token }))
  }, [])
  function closeModal() {
    setIsOpen(false);
  }


  function openModal() {
    setIsOpen(!isOpen);
  }

  useOutsideClick(ref, () => closeModal());

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto z-[100000] transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-100" />
        </div>
        <div
          ref={ref}
          className={`inline-block relative z-[5000] align-bottom bg-white rounded-lg p-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isOpen ? 'scale-100' : 'scale-90'
            }`}
        >
          <h2 className="text-xl font-semibold mb-4">Appointment Requests</h2>
          <div className="mt-2">
            <div className="flex gap-2">
              <button
                className={`flex-1 p-2 rounded-md font-semibold border-2 ${activeTab === 'accepted' ? 'bg-main text-white font-semibold' : ''
                  }`}
                onClick={() => handleTabChange('accepted')}
              >
                Accepted
              </button>
              <button
                className={`flex-1 p-2 rounded-md font-semibold border-2 ${activeTab === 'received' ? 'bg-main text-white font-semibold' : ''
                  }`}
                onClick={() => handleTabChange('received')}
              >
                Received
              </button>
              <button
                className={`flex-1 p-2 rounded-md font-semibold border-2 ${activeTab === 'sent' ? 'bg-main text-white font-semibold' : ''
                  }`}
                onClick={() => handleTabChange('sent')}
              >
                Sent
              </button>
            </div>
          </div>
          <div className="h-80 mt-2 overflow-y-auto">
            {/* Content for the selected tab */}
            {activeTab === 'accepted' && (
              <div className="p-4 flex flex-col gap-1">
                {appointmentRequests.length === 0 ? (
                  <div className="text-center text-subcolor2">No appointments available.</div>
                ) : (
                  appointmentRequests.map((req) => (
                    <div className='p-4 text-sm border rounded-md shadow-md' key={req.id}>
                      <h2>{`You have an appointment with #example`}</h2>
                      <div>
                        <h2 className='text-subcolor3 font-medium'>
                          {moment(req.from).format('DD/MM/YYYY, HH:mm')}-{moment(req.to).format('HH:mm A')}
                        </h2>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}


            {activeTab === 'received' && (
              /* Received requests content */
              <div className="p-4 flex flex-col gap-1">
                {receivedAppointmentRequests.length === 0 ? (
                  <div className="text-center text-subcolor2">No received requests available.</div>
                ) : (
                  receivedAppointmentRequests.map((req) => (
                    <div className='p-4 text-sm border rounded-md shadow-md' key={req.id}>
                      <h2>{`#Example wants to schedule an appointment`}</h2>
                      <div>
                        <h2 className='text-subcolor3 font-medium'>
                          {moment(req.from).format('DD/MM/YYYY, HH:mm')}-{moment(req.to).format('HH:mm')}
                        </h2>
                      </div>
                      <div className='flex gap-2 w-full justify-end'>
                        <button onClick={()=>handleAcceptAppointmentRequest(req?.id)} className='px-4 py-1 rounded border-2 font-medium text-main border-main'>Accept</button>
                        <button onClick={()=>handleRejectAppointmentRequest(req?.id)} className='px-4 py-1 rounded border-2 font-medium text-subcolor2 border-subcolor2'>Deny</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'sent' && (
              <div className="p-4 flex flex-col gap-1">
                {sentAppointmentRequests.length === 0 ? (
                  <div className="text-center text-subcolor2">No sent requests available.</div>
                ) : (
                  sentAppointmentRequests.map((req) => (
                    <div className='p-4 text-sm border rounded-md shadow-md' key={req.id}>
                      <h2>{`You want to schedule an appointment`}</h2>
                      <div>
                        <h2 className='text-subcolor3 font-medium'>
                          {moment(req.from).format('DD/MM/YYYY, HH:mm')}-{moment(req.to).format('HH:mm')}
                        </h2>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
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
