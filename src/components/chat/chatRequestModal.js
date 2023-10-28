import React, { useState, useEffect, Fragment } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

export function ChatRequestModal({ isOpen, setIsOpen ,handleSubmit}) {

  const [message, setMessage] = useState(''); 
console.log(message)
  

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }


  return (
    <>
      <Dialog open={isOpen} onOpenChange={openModal}>
        <DialogContent className="sm:max-w-[425px] shadow-md bg-white">
          <DialogHeader>
            <DialogTitle>Send a Message Request!</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={()=>handleSubmit(message,closeModal)}
              type="button"
              className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              // onClick={sendMessageRequest}
            >
              Send Request
            </button>
          
          </div>
          <DialogFooter>
            <div className="mt-4">
              <Button className="bg-black" onClick={closeModal}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
