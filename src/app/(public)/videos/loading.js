'use client'
import { LoadingSkeletons } from "@/components"

export default function Loading() {
    return (
       
       <div className="w-[90%] mx-auto my-4"> 
        <LoadingSkeletons times={6} />
       </div>
    )
}