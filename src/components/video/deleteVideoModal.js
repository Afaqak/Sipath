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

export function DeleteModal({ isOpen, setIsOpen, onDeleteSubmit, message }) {
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
            <DialogTitle>Delete!</DialogTitle>
          </DialogHeader>

          <DialogDescription>{message}</DialogDescription>

          <DialogFooter>
            <div className="mt-4 flex gap-2">
              <Button className="bg-black" onClick={closeModal}>
                Close
              </Button>
              <Button
                onClick={onDeleteSubmit}
                variant="outline"
                className="flex gap-2 transform active:-translate-y-1 text-subcolor2 border-subcolor2 items-center"
              >
                <Icons.trash className="w-4 h-4 stroke-subcolor2" />
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
