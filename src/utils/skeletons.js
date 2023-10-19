import { Skeleton } from '@/components/ui/skeleton';
export const LoadingSkeletons = ({ times }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
    {[...Array(times)].map((_, idx) => (
      <div key={idx} className="bg-white rounded-md p-4 shadow-md">
        <Skeleton className="h-48 mb-2 " />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const BookSkeleton = ({ times }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    {[...Array(times)].map((_, idx) => (
      <div key={idx} className="bg-white flex gap-2 rounded-md p-4 shadow-md">
        <Skeleton className=" w-[9rem]" />
        <div className="flex justify-between flex-col">
          <div className="grid grid-cols-2">
            <div>
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-8 w-8 mt-2 rounded-full" />
              <Skeleton className="h-4 mt-2 w-[100px]" />
              <Skeleton className="h-4 mt-1 w-[100px]" />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
