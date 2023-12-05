
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UserAvatar from '../common/userAvatar';
export const ExpertItem = ({ item}) => {

  return (
    <>

      <div className={`relative mb-6 flex flex-col items-center  lg:h-40 max-h-[20rem] h-[20rem] py-6 px-4 w-[20rem] bg-white box-shadow-main rounded-sm mt-6 md:mt-2`}>
        <div className="lg:absolute relative mb-6 lg:mb-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:-left-16 w-[8rem] lg:w-[7rem] rounded-full">
          <UserAvatar className="h-28 w-28" user={{ image: item && item['user.profile_image'] ,name:item && item['user.display_name'].slice(0,2) }} />
        </div>
        <div className="bg-gray-200 w-full lg:hidden h-[1px]"></div>
        <div className="lg:ml-12 mt-4 lg:mt-0">
          <div className="mb-2">
            <div>
              <div className="flex justify-between lg:justify-normal lg:gap-3 items-center">
                <h1 className="text-xl font-normal uppercase">{item && item["user.display_name"]}</h1>
                <h2 className="font-extrabold text-sm gap-1 flex items-center">
                {item && item["user.rating"]}
                  <span>
                    <Image src="/svgs/star.png" alt="star" width={20} height={20} />
                  </span>
                </h2>
              </div>
              <div className="text-[0.8rem] flex items-center lg:justify-normal lg:gap-4 justify-between">
                <p className="font-medium text-[#616161]">{item && item["user.follower_count"]} followers</p>
                <p className="text-main font-medium">
                  {item && item?.expertiseCategories?.join('-')}
                </p>
              </div>
            </div>
          </div>
          <p className="break-all font-light text-gray-400 line-clamp-3 text-sm">{item && item['user.bio']}</p>
        </div>
      </div>



    </>

  );
};
