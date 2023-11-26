import React, { useRef, useState, forwardRef, useEffect } from 'react';
import moment from 'moment';
import { Button } from '../ui/button';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useSession } from 'next-auth/react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { approveAppointmentRequest, fetchAppointments, fetchReceivedAppointmentRequests, rejectAppointmentRequest, fetchSentAppointmentsRequests } from '@/features/appointments/appointmentThunk';
import UserAvatar from '../common/userAvatar';

export function AppointmentsModal({ isOpen, setIsOpen, token }) {
  const [loading, setLoading] = useState(false);
  const { data: user } = useSession();
  const receivedAppointmentRequests = useSelector(state => state.appointments.receivedAppointmentRequests)
  const sentAppointmentRequests = useSelector(state => state.appointments.sentAppointmentRequests)
  const appointmentRequests = useSelector(state => state.appointments.appointmentRequests)

  const dispatch = useDispatch();
  const ref = useRef(null);

  const [activeTab, setActiveTab] = useState('received');

  const handleAcceptAppointmentRequest = (id) => {

    dispatch(approveAppointmentRequest({ id, token }))
  }

  const handleRejectAppointmentRequest = (id) => {

    dispatch(rejectAppointmentRequest({ id, token }))
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


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const secondUser = (appointment) => {
    const appointmentChat = appointment?.chat
    const secondMember = appointmentChat?.chat_member_1.id === user?.user?.id ? appointmentChat?.chat_member_1 : appointmentChat?.chat_member_2
    return secondMember
  }

  return (
    <Dialog open={isOpen} onOpenChange={openModal}>
      <DialogContent className="sm:max-w-[425px] shadow-md overflow-y-auto  max-h-[80vh] bg-white">
        <DialogHeader>
          <DialogTitle>Appointment Request!</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account" className="">
          <TabsList>
            <TabsTrigger className="" value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
          </TabsList>
          <TabsContent value="accepted">
            <div className="py-4 flex flex-col gap-1">
              {appointmentRequests.length === 0 ? (
                <div className="text-center text-subcolor2">No appointments available.</div>
              ) : (
                appointmentRequests.map((req) => (
                  <div className='p-4 text-sm border rounded-md shadow-md' key={req.id}>
                    <div className='flex gap-2 items-center'>
                      <UserAvatar user={{ image: secondUser(req)?.profile_image, name: secondUser(req)?.display_name }} />
                    </div>

                    <h2 className='text-subcolor3 mt-2 font-medium'>
                      {moment(req.from).format('DD/MM/YYYY, HH:mm')}-{moment(req.to).format('HH:mm A')}
                    </h2>

                    <h2 className='mt-3'>{`You have an appointment with ${secondUser(req)?.display_name}`}</h2>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="received">
            <div className="py-4 flex flex-col gap-1">
              {receivedAppointmentRequests.length === 0 ? (
                <div className="text-center text-subcolor2">No received requests available.</div>
              ) : (
                receivedAppointmentRequests.map((req) => (
                  <div className='p-4 text-sm border rounded-md shadow-md' key={req.id}>
                    <div className='flex gap-2 items-center'>
                      <UserAvatar user={{ image: req?.user_appointment_by?.profile_image, name: req?.user_appointment_by?.display_name }} />
                    </div>

                    <div className='mt-2'>
                      <h2 className='text-subcolor3 font-medium'>
                        {moment(req.from).format('DD/MM/YYYY, HH:mm')}-{moment(req.to).format('HH:mm')}
                      </h2>
                    </div>

                    <div className='mt-3'>
                      <p className='text-gray-600'>
                        {`${req?.user_appointment_by?.display_name} wants to schedule an appointment.`}
                      </p>
                    </div>

                    <div className='flex gap-2 w-full justify-end mt-3'>
                      <button
                        onClick={() => handleAcceptAppointmentRequest(req?.id)}
                        className='px-4 py-1 rounded border-2 font-medium text-main border-main hover:bg-main hover:text-white focus:outline-none focus:ring focus:border-blue-300'
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleRejectAppointmentRequest(req?.id)}
                        className='px-4 py-1 rounded border-2 font-medium text-subcolor2 border-subcolor2 hover:bg-subcolor2 hover:text-white focus:outline-none focus:ring focus:border-blue-300'
                      >
                        Deny
                      </button>
                    </div>
                  </div>

                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="sent">
            <div className="py-4 flex flex-col gap-1">
              {sentAppointmentRequests.length === 0 ? (
                <div className="text-center text-subcolor2">No sent requests available.</div>
              ) : (
                sentAppointmentRequests.map((req) => (
                  <div className='p-4 text-sm border rounded-md shadow-md' key={req.id}>
                    <div className='flex gap-2 items-center'>
                      <UserAvatar user={{ image: req?.user_appointment_to?.profile_image, name: req?.user_appointment_to?.display_name }} />
                    </div>

                    <h2 className='text-subcolor3 mt-2 font-medium'>
                      {moment(req.from).format('DD/MM/YYYY, HH:mm')}-{moment(req.to).format('HH:mm A')}
                    </h2>

                    <h2 className='mt-3'>{`You sent an appointment request to ${req?.user_appointment_to?.display_name}`}</h2>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button className="bg-black" onClick={closeModal}>
            Close
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>

  );
}
