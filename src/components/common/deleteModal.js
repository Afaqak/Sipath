import React, { useEffect, Fragment } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Icons } from '../icons';

export function DeleteModal({ isOpen, setIsOpen, onDeleteSubmit, text }) {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={openModal}>
        <DialogContent className="sm:max-w-[425px] bg-white shadow-lg">
          <DialogHeader>
            <DialogTitle>Delete!</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete{' '}
            <span className="font-bold">{text}</span> ?
          </DialogDescription>
          <DialogFooter>
            <div className="mt-4 flex gap-2">
              <Button className="bg-black" onClick={closeModal}>
                Close
              </Button>
              <Button
                onClick={onDeleteSubmit}
                variant="outline"
                className="flex gap-2 transform active:-translate-y-1  items-center"
              >
                <Icons.trash className="w-4 h-4  stroke-subcolor2" />
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
