import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessageRequests, approveRequest } from '@/features/chat/requests/messageRequestThunk';

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

export function RequestModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state?.messageRequests?.messageRequests);

  useEffect(() => {
    dispatch(fetchMessageRequests(18));
  }, []);

  const approveMessageRequest = (requestId) => {
    try {
      dispatch(approveRequest({ userId: 18, id: requestId }));
    } catch (err) {
      throw err;
    }
  };

  const requestedPeople = [
    {
      id: 1,
      name: 'John Doe',
      message: 'Hi, can we chat?',
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'I have a question for you.',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      message: "Let's chat about our project.",
    },
  ];

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={openModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Requests for Messages</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <div key={index} className="mb-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{requestedPeople[index].name}</p>
                    <p className="text-sm text-gray-500">{request.text}</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => approveMessageRequest(request.requestId)}
                  >
                    approve
                  </button>
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
