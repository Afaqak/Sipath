import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components';

export function BuyNowModal({ isOpen, setIsOpen, onBuyNowSubmit, productName='new', productPrice='10' }) {
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function onDone(){
    closeModal()
    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px] bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle>Confirm Purchase</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Are you sure you want to buy <span className="font-bold">{productName}</span> for ${productPrice}?
        </DialogDescription>

        <DialogFooter>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>

            <Button
              onClick={() => {
                setLoading(true);
                onBuyNowSubmit(onDone);
              }}
            
              className={`flex gap-2 bg-subcolor text-white hover:bg-subcolor/90 transform active:-translate-y-1 items-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading && (
                <span className="animate-spin">
                  <Icons.Loader2 width="20" height="20" stroke="white" />
                </span>
              )}
              Buy Now
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
