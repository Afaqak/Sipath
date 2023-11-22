import { FeedSkeleton, LoadingSkeletons } from "@/utils/skeletons"
export default function Loading(){
    return(
        <div className="flex flex-col gap-4">
        <FeedSkeleton time={1} />
        <LoadingSkeletons times={3}/>
        </div>
    )
}