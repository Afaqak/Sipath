'use client'

import { LoadingSkeletons } from "@/components"
export default function Loading() {
    return <div className="w-[90%] mx-auto mt-6"><LoadingSkeletons times={6}/></div>
}