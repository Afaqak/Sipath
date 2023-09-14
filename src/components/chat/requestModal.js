import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessageRequests, approveRequest } from '@/features/chat/requests/messageRequestThunk';
import { Dialog, Transition } from '@headlessui/react';

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
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[2000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Requests for Messages
                  </Dialog.Title>
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
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
