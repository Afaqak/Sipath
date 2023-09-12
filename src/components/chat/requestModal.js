import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessageRequests, approveRequest } from '@/features/chat/requests/messageRequestThunk';
export function RequestModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state?.messageRequests?.messageRequests);

  useEffect(() => {
    dispatch(fetchMessageRequests(18));
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

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

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center z-[2000] justify-center bg-black bg-opacity-25"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Requests for Messages
                </h3>
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
