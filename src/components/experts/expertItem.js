import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export const ExpertItem = ({ expert }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/tutor')}
      className="relative mb-6  flex flex-col items-center w-[19rem] min-h-[10rem] lg:h-[10rem] py-6 px-4 lg:w-[22rem] bg-white shadow-md rounded-sm"
    >
      <div className="lg:absolute relative top-4 lg:-left-14 w-[8rem] h-[8rem] lg:w-[7rem] lg:h-[7rem] rounded-full">
        <Image
          alt="demo image"
          className="rounded-full w-full h-full object-cover"
          src={expert.imageUrl}
          width={200}
          height={200}
        />
        <button className="absolute -bottom-2 right-4 lg:right-3 font-semibold bg-blue-500 text-white rounded-full px-6 py-1 flex justify-center items-center">
          Follow
        </button>
      </div>
      <div className="bg-gray-200 mt-10 w-full lg:hidden h-[1px]"></div>
      <div className="lg:ml-12 mt-4 lg:mt-0">
        <div className="mb-2">
          <div>
            <div className="flex justify-between lg:justify-normal lg:gap-3 items-center">
              <h1 className="text-xl font-normal uppercase">{expert.accountName}</h1>
              <h2 className="font-extrabold text-sm gap-1 flex items-center">
                4.7{' '}
                <span>
                  <Image src="/svgs/star.png" width={20} height={20} />
                </span>
              </h2>
            </div>
            <div className="text-[0.8rem] flex items-center lg:justify-normal lg:gap-4 justify-between">
              <p className="font-medium text-[#616161]">{expert.followers} followers</p>
              <p className="text-[#1850BC] font-medium">Maths-Chemistry-Physics</p>
            </div>
          </div>
        </div>
        <p className="break-all font-light text-gray-400 text-sm">{expert.description}</p>
      </div>
    </div>
  );
};
