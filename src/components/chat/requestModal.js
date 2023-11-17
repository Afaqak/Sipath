import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessageRequests, approveRequest, rejectRequest } from '@/features/chat/requests/messageRequestThunk';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import { Icons } from '../icons';



export function RequestModal({ isOpen, setIsOpen, token }) {
  const dispatch = useDispatch();
  const [agreeLoading, setAgreeLoading] = useState(false)
  const [rejectLoading, setRejectLoading] = useState(false)
  const requests = useSelector((state) => state?.messageRequests?.messageRequests);
  const { data: user } = useSession()
  useEffect(() => {
    dispatch(fetchMessageRequests({ token }));
  }, []);

  const approveMessageRequest = (id) => {
    setAgreeLoading(true)
    const onSuccess = () => setAgreeLoading(false)
    try {
      dispatch(approveRequest({ id, token, onSuccess }));
    } catch (err) {
      throw err;
    }
  };


  const rejectMessageRequest = (id) => {
    setAgreeLoading(true)
    const onReject = () => setRejectLoading(false)
    try {
      dispatch(rejectRequest({ id, token, onReject }));
    } catch (err) {
      throw err;
    }
  }


  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={openModal}>
        <DialogContent className="bg-white shadow-md sm:max-w-[425px] max-h-[60vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle> Requests for Messages</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <div key={index} className="mb-4 flex flex-col justify-between ">
                  <div>
                    <p className="font-semibold">{request?.user_chat_requested_by?.display_name}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{request?.message}</p>
                  </div>
                  <div className='flex gap-2 self-end'>
                    <button
                      type="button"
                      className="inline-flex justify-center capitalize rounded-md border gap-2 border-transparent bg-blue-100 px-4 py-1 text-[0.79rem] font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => approveMessageRequest(request?.id)}
                    >
                      {
                        agreeLoading &&
                        <span className='animate-spin'><Icons.Loader2 width="20" height="20" stroke="#1e3a8a" /></span>} approve
                    </button>
                    <button
                      type="button"
                      className="inline-flex gap-2 justify-center capitalize rounded-md border border-transparen bg-subcolor2  px-4 py-1 text-[0.79rem] font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => rejectMessageRequest(request?.id)}
                    >
                      {
                        rejectLoading &&
                        <span className='animate-spin'><Icons.Loader2 width="20" height="20" stroke="white" /></span>} reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-gray-400 text-center">No Conversation Requests!</span>
            )}
          </div>
          <DialogFooter>
            <div className="mt-4">
              <Button className="bg-black" onClick={closeModal}>
                close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
