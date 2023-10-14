'use client';
import React, { useState } from 'react';
import Image from 'next/image';

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

const SectionAddModal = ({ isOpen, setIsOpen, setSectionName, sectionName, handleAddSection }) => {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  return (
    <Dialog open={isOpen} onOpenChange={openModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <input
            type="text"
            value={sectionName}
            className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] outline-none rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-non"
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="Section Name"
          />
        </DialogDescription>

        <DialogFooter>
          <div className="mt-4 flex gap-2">
            <Button className="bg-black" onClick={closeModal}>
              Close
            </Button>
            <Button
              onClick={handleAddSection}
              variant="outline"
              className="flex gap-2 transform active:-translate-y-1 text-subcolor border-subcolor items-center"
            >
              <Image width={16} height={16} alt="add more" src={'/svgs/add_video.svg'} />
              New Section
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
