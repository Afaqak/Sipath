import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import UserAvatar from '../common/userAvatar';
import { useSession } from 'next-auth/react';
import { EditQuizModal } from '@/components';
export const Quiz = ({ quiz, isEdit }) => {
  const { data: user } = useSession();
  const [open, setOpen] = useState(false);
  console.log(isEdit);
  return (
    <div
      className={`${
        isEdit && 'border-subcolor border-2'
      } mt-4 flex md:flex-row border flex-col md:items-center -z-10 justify-between bg-white rounded-lg shadow-lg`}
    >
      <div className="flex md:flex-row  relative md:max-w-[20%] items-center flex-col">
        <div className="h-44 md:h-28 rounded-lg">
          <Image
            src={quiz?.thumbnail}
            alt="demo-4"
            className="h-full w-full object-cover rounded-md"
            width={100}
            height={100}
          />
        </div>
        <div className="bottom-2 md:right-0 md:top-1/2 md:-translate-y-1/2  right-2 md:translate-x-6  absolute ">
          <UserAvatar user={{ image: user?.user?.profile_image }} />
        </div>
      </div>
      <div className="flex justify-between flex-1 flex-col px-3 mb-3 md:px-0 md:mb-0 md:flex-row">
        <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-8">
          <div>
            <h1 className="font-semibold md:text-lg text-base">{quiz?.title}</h1>
            <p>{user?.user.display_name}</p>
          </div>
        </div>
        <div className="flex md:flex-row items-center flex-col md:px-4  gap-2">
          <div
            className="flex gap-1 flex-row justify-between items-center md:justify-end md:flex-col text-sm
      "
          >
            <h2 className="font-extrabold gap-1 flex items-center">
              4.7 <Image src="/svgs/star.png" className="" width={24} height={24} />
            </h2>
            <p className="text-gray-600 text-[0.8rem] font-medium flex gap-1">
              {' '}
              24K <span>Views</span>
            </p>
          </div>
          {isEdit ? (
            <Button
              onClick={() => setOpen(!open)}
              variant="outline"
              className=" border-2 text-black cursor-pointer bg-white border-black"
            >
              Edit Quiz
            </Button>
          ) : (
            <div className="flex flex-col gap-2 text-sm lg:text-base sel justify-end">
              <Button variant="outline" className=" border-2 text-black bg-white border-black">
                View Quiz
              </Button>
              <Button variant="outline" className=" text-subcolor bg-white border-subcolor">
                View Solutions
              </Button>
            </div>
          )}
        </div>
      </div>
      <EditQuizModal isOpen={open} setIsOpen={setOpen} quiz={quiz} />
    </div>
  );
};
