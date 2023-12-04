import React, { useState } from 'react';
import Image from 'next/image';
import UserAvatar from '../common/userAvatar';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { errorToast, warningToast } from '@/utils/toasts';
import { Icons } from '../icons';

export const ExpertsComponent = ({ title, fetchExperts, session, data, setData }) => {
  const [limit, setLimit] = useState(6)
  const [load, setLoad] = useState()
  const loadMore = () => {
    setLoad(true)
    let limitSend = limit + 6
    fetchExperts(limitSend, () => setLoad(false))
    setLimit(limitSend);
  };


  const [warning, setWarning] = useState(false)
  return (
    <>
      {data?.length > 0 && (
        <div className="py-8 ">
          <h2 className="text-2xl font-extrabold mb-4">{title}</h2>
          <div className="grid lg:ml-6 md:mt-16 lg:mt-8 grid-cols-1 md:grid-cols-2 gap-16 lg:gap-x-32 2xl:grid-cols-3 gap-y-4">
            {data.map((item, index) => (
              <ExpertCard setData={setData} setWarning={setWarning} session={session} item={item} key={index} />
            ))}


          </div>
          <div className="text-center w-full flex justify-center mt-8">
            {load ? <span className='animate-spin'><Icons.Loader2 stroke='black' height='40' width='40' /></span> :
              <div className="flex justify-center flex-col items-center">
                <button onClick={loadMore} className="bg-gray-100 px-4 py-2 rounded-md text-black font-semibold">
                  Load More
                </button>
                <Image src="/svgs/expand_more.svg" alt="expand_more" width={15} height={15} />

              </div>
            }
          </div>
        </div>
      )}
    </>
  );
};



const ExpertCard = ({ item, setData, session}) => {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const privateAxios = useAxiosPrivate()
  
  const handleFollowUser = async (item) => {
    try {
      if (!session?.token) {
        return warningToast("Login to follow User",()=>router.push('/sign-in'))
      }

      setLoading(true);
      if (item?.is_following) {
        await privateAxios.delete('/users/unfollow', {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
          data: {
            user_id: item?.user_id,
          },
        });


        setData((prevData) =>
          prevData.map((expert) =>
            expert?.user_id === item?.user_id
              ? { ...expert, is_following: false }
              : expert
          )
        );
      } else {
        await privateAxios.post(
          '/users/follow',
          {
            user_id: item?.user_id,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          }
        );


        setData((prevData) =>
          prevData.map((expert) =>
            expert?.user_id === item?.user_id
              ? { ...expert, is_following: true }
              : expert
          )
        );
      }


    } catch (err) {
      errorToast('Error Occurred!');
    } finally {
      setLoading(false);
    }
  };



  return (
  <div className={`relative mb-6 cursor-pointer flex flex-col h-fit lg:h-40 py-6 px-4 min-w-[70%] bg-white box-shadow-main rounded-sm mt-6 md:mt-2`}>
      <div className="lg:absolute relative mb-6 lg:mb-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:-left-16 w-[8rem] lg:w-[7rem] rounded-full">
        <UserAvatar className="h-28 w-28 text-2xl" user={{ image: item && item['user.profile_image'] ,name:item && item['user.display_name'].slice(0,2) || item['user.first_name'].slice(0,2)}} />
        <button
          className={`font-bold   bottom-0  text-white rounded-full w-32 cursor-pointer capitalize py-1 flex justify-center items-center ${item?.is_following ? 'bg-main' : 'bg-[#FBA422]'}
         `}
          disabled={loading}
          onClick={() => handleFollowUser(item)}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',

          }}
        >
          {item?.is_following ? (
            <span className="flex gap-2 items-center">
              {loading ? <span className='animate-spin'><Icons.Loader2 stroke='white' height='23' width='23' /></span> :
                <img className="h-6 w-6" src="/svgs/check_circle.svg" />
              }
              Followed
            </span>
          ) : (
            <span className="flex gap-2 items-center">
              {loading && <span className='animate-spin'><Icons.Loader2 stroke='white' height='23' width='23' /></span>}
              Follow
            </span>
          )}
        </button>
      </div>
      <div className="bg-gray-200 w-full lg:hidden h-[1px]"></div>
      <div className="lg:ml-12 mt-4 lg:mt-0">
        <div className="mb-2">
          <div>
            <div className="flex justify-between lg:justify-normal lg:gap-3">
              <h1 className="text-xl font-normal uppercase hover:underline" onClick={() => router?.push(`/profile/${item?.user_id}`)}>{item["user.display_name"]}</h1>
              <h2 className="font-extrabold text-sm gap-1 flex items-center">
                {item["user.rating"]}{' '}
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
  )
}