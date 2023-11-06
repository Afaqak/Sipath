'use client'

import { Icons } from "@/components"
export default function Loading() {
    return (<div className='min-h-[60vh] flex items-center justify-center'>
        <div className='flex gap-2 items-center'>
            <div className='animate-spin'>
                <Icons.Loader2 stroke="black" width="36" height="36" className="stroke-black w-6 h-6" />
            </div>
            <p>Loading...</p>
        </div>
    </div>)
}