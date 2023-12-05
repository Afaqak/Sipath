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
export const LoadingCommentsSkeleton = ({ times = 3 }) => (
  <div className="py-8 grid  gap-4">
    {[...Array(times)].map((_, idx) => (
      <div key={idx} className="bg-white rounded-md p-4 shadow-md">
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

export const LoadingQuillSkeleton = () => (
  < div className = 'flex absolute top-0 left-0 rounded-md gap-4 p-2 h-full z-[5000] bg-white w-full' >
      <Skeleton className="w-14 h-12 rounded-full" />
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex gap-6'>
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <div className='flex flex-col gap-4 w-full'>
          <Skeleton className="h-4 w-[20rem] rounded-full" />
          <Skeleton className="w-[24rem] h-4 rounded-full" />
          <Skeleton className="w-full h-4 rounded-full" />
        </div>
      </div>
    </div >
)


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



export const ExpertSkeleton = ({ times }) => (
  <div className="grid mx-auto md:grid-cols-2  gap-4 mt-4">
    {[...Array(times)].map((_, idx) => (
      <div key={idx} className="bg-white flex gap-2 rounded-md p-4 shadow-md">
        <div className="flex items-center">
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
        <div className="flex gap-3 flex-col w-full">
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[250px]" />
        </div>
      </div>
    ))}
  </div>
);


export const FeedSkeleton = ({ time }) => {
  return (
    <div className='flex gap-6 flex-col w-full mx-auto'>
      {
        [...Array(time)].map((t) => (
          <div key={t} className="flex flex-col md:w-[70%] w-[90%] lg:w-[50%] mx-auto px-4 pt-4 pb-3 bg-white shadow-md rounded-md">
            <div className='flex items-center gap-2'>
              <Skeleton className="h-10 w-10 rounded-full mb-2" />
              <Skeleton className="h-4 w-20 rounded-full mb-2" />

            </div>
            <Skeleton className="rounded-full h-4 w-full" />
            <Skeleton width={60} className="mt-2 aspect-video w-full" />
            <Skeleton className="mt-4 rounded-md h-4 w-full " />
          </div>
        ))
      }
    </div>
  );
};
export const CategoriesSkeleton = ({ time }) => {
  return (
    <div className='flex gap-6 w-full mx-auto'>
      {
        [...Array(time)].map((t) => (
        <div key={t} className="flex flex-col gap-4 h-[14rem] md:w-[70%] w-[90%] lg:w-[50%] mx-auto px-4 pt-4 pb-3 bg-white shadow-md rounded-md">
             
              <Skeleton className="h-20 w-20 self-center rounded-full mb-2" />
              <Skeleton className="h-4 w-24 rounded-full mb-2" />
              <Skeleton className="h-4 w-34 rounded-full mb-2" />
          </div>
        ))
      }
    </div>
  );
};