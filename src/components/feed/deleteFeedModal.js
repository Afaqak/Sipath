import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Icons } from '../icons'


export const DeleteFeedModal = ({ open, setOpen, onDelete, loading }) => {
    const closeModal = () => setOpen(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This Post will be permanently deleted!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} variant="destructive" className="flex gap-1" onClick={onDelete}>
                        {
                            loading &&
                            <span className='animate-spin'><Icons.Loader2 stroke="white" width="20" height="20" className="" /></span>
                        }
                        Delete</Button>
                    <Button onClick={closeModal}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
