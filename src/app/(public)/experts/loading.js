'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { ExpertSkeleton } from "@/utils/skeletons"
export default function Loading() {
    return (
    <div className="mt-4">
        <Skeleton className={"w-[30%] h-4"}/>
        <ExpertSkeleton times={6}/>
    </div>)
}