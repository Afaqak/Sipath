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


export const DeleteFeedModal = ({ open, setOpen,onDelete }) => {
    const closeModal=()=>setOpen(false)
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
                <Button variant="destructive" onClick={onDelete}>Delete</Button>
                <Button onClick={closeModal}>Close</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
