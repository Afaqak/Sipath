import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessageRequests, approveRequest ,rejectRequest} from '@/features/chat/requests/messageRequestThunk';

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



export function RequestModal({ isOpen, setIsOpen,token }) {
  const dispatch = useDispatch();
  const [agreeLoading,setAgreeLoading]=useState(false)
  const [rejectLoading,setRejectLoading]=useState(false)
  const requests = useSelector((state) => state?.messageRequests?.messageRequests);
  const {data:user}=useSession()
  useEffect(() => {
    dispatch(fetchMessageRequests({token}));
  }, []);

  const approveMessageRequest = (id) => {
    console.log(id,"{id}")
    try {
      dispatch(approveRequest({id,token}));
    } catch (err) {
      throw err;
    }
  };


  const rejectMessageRequest=(id)=>{
    try {
      dispatch(rejectRequest({id,token}));
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
        <DialogContent className="bg-white shadow-md sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Requests for Messages</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <div key={index} className="mb-4 flex justify-between items-center">
                  <div>
                    {/* <p className="font-semibold">{requestedPeople[index].name}</p> */}
                    <p className="text-sm text-gray-500">{request?.message}</p>
                  </div>
                  <div className='flex gap-2'>
                  <button
                    type="button"
                    className="inline-flex justify-center capitalize rounded-md border border-transparent bg-blue-100 px-4 py-1 text-[0.79rem] font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => approveMessageRequest(request?.id)}
                  >
                    approve
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center capitalize rounded-md border border-transparen bg-subcolor2  px-4 py-1 text-[0.79rem] font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => rejectMessageRequest(request?.id)}
                  >
                    reject
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
