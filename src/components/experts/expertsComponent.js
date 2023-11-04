import React from 'react';
import Image from 'next/image';
import UserAvatar from '../common/userAvatar';

export const ExpertsComponent = ({ title, data }) => {
  console.log(data[0]?.user)
  return (
    <>
      {data?.length > 0 && (
        <div className="py-8 ">
          <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
          <div className="grid lg:ml-6 md:mt-16 lg:mt-8 grid-cols-1 md:grid-cols-2 gap-16 lg:gap-x-32 2xl:grid-cols-3 gap-y-4">
            {data.map((item, index) => (
              <div key={index} className={`relative mb-6 flex flex-col items-center h-fit lg:h-40 py-6 px-4 min-w-[70%] bg-white shadow-md rounded-sm mt-6 md:mt-2`}>
                <div className="lg:absolute relative mb-6 lg:mb-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:-left-16 w-[8rem] lg:w-[7rem] rounded-full">
                    <UserAvatar className="h-28 w-28" user={{image:item['user.profile_image']}}/>
                </div>
                <div className="bg-gray-200 w-full lg:hidden h-[1px]"></div>
                <div className="lg:ml-12 mt-4 lg:mt-0">
                  <div className="mb-2">
                    <div>
                      <div className="flex justify-between lg:justify-normal lg:gap-3 items-center">
                        <h1 className="text-xl font-normal uppercase">{item["user.display_name"]}</h1>
                        <h2 className="font-extrabold text-sm gap-1 flex items-center">
                          4.7{' '}
                          <span>
                            <Image src="/svgs/star.png" alt="star" width={20} height={20} />
                          </span>
                        </h2>
                      </div>
                      <div className="text-[0.8rem] flex items-center lg:justify-normal lg:gap-4 justify-between">
                        <p className="font-medium text-[#616161]">{item["user.follower_count"]} followers</p>
                        <p className="text-main font-medium">
                          {item?.expertiseCategories?.join('-')}
                      </p>
                      </div>
                    </div>
                  </div>
                  <p className="break-all font-light text-gray-400 line-clamp-3 text-sm">{item['user.bio']}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
