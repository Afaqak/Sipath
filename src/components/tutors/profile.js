import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import UserAvatar from '../common/userAvatar';

export const Profile = ({ type }) => {
  const user = useSelector((state) => state.userAuth.user);
  return (
    <div className=" bg-white mt-10 flex items-center gap-10 flex-col md:flex-row shadow-md mx-auto rounded-md p-4">
      <div className="relative mx-auto flex items-center justify-center">
        <UserAvatar user={{ name: user?.display_name || '' }} className=" w-36 h-36" />
        <button
          className="font-semibold bg-black text-white rounded-full px-8 py-1 flex justify-center items-center"
          style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          Follow
        </button>
      </div>

      <div className="">
        <h1 className="mb-2 uppercase font-medium">{user?.display_name}</h1>
        <div className="flex md:flex-row flex-col gap-12">
          <div className="flex gap-12">
            <div className="">
              <ul className="text-sm flex flex-col gap-2 whitespace-nowrap text-[#616161]">
                <li className="text-[0.75rem]">
                  <span className="font-semibold text-[0.85rem]">24K</span> Followers
                </li>
                <li className="text-[0.75rem]">
                  <span className="font-semibold text-[0.85rem]">521</span> Following
                </li>
                <li className="text-[0.75rem]">
                  <span className="font-semibold text-[0.85rem]">24$/hr</span> Hourly rate
                </li>
                <div className="flex font-bold gap-2">
                  4.7 <Image src={'/svgs/star.svg'} alt="star" width={20} height={20} />
                </div>
              </ul>
            </div>
            <div className="text-[#616161] font-light">
              <h1>EXPERTISE</h1>
              <ul className="text-sm whitespace-nowrap list-disc list-inside font-semibold text-[0.7rem]">
                <li>Maths</li>
                <li>Physics</li>
                <li>Chemistry</li>
              </ul>
            </div>
          </div>
          <div className="text-[#616161] font-light">
            <div className="">
              <h1>BIO</h1>
              <p className={`text-sm ${type === 'myprofile' ? 'w-full' : 'w-[80%]'}`}>
                {user?.bio}
              </p>
            </div>
          </div>
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

const ActionButtons = () => {
  return (
    <div className="flex md:flex-col lg:gap-0 gap-4 flex-row text-sm lg:mr-5">
      <button className="border-2 border-blue-500 w-full px-3 whitespace-nowrap justify-center items-center font-bold flex gap-2 text-[0.7rem] text-blue-500 bg-transparent   mb-1 rounded">
        <Image src={'/svgs/blueB.svg'} className="w-4 h-4" width={25} height={25} alt="post" />
        <span className="hidden md:block">New Post</span>
      </button>
      <Link
        href={'/tutor/video-upload'}
        className="border-2 border-subcolor w-full whitespace-nowrap font-bold flex gap-1 px-3 items-center text-[0.7rem] text-subcolor bg-transparent justify-center mb-1 rounded"
      >
        <Image
          src={'/svgs/videogreen.svg'}
          className="h-5 w-5"
          width={15}
          height={15}
          alt="video"
        />{' '}
        <span className="hidden md:block">New Video</span>
      </Link>
      <button className="border-2 border-gray-500 w-full whitespace-nowrap font-bold flex items-center gap-2 text-[0.7rem] text-gray-500 bg-transparent justify-center mb-1 px-1 rounded">
        <Image
          src={'/svgs/messageblack.svg'}
          className="h-4 w-4"
          width={15}
          height={15}
          alt="message"
        />{' '}
        <span className="hidden md:block">Chat</span>
      </button>
      <button className="border-2 border-gray-500 w-full whitespace-nowrap font-bold flex items-center gap-2 text-[0.7rem] text-gray-500 bg-transparent justify-center mb-1 px-1 rounded">
        <Image
          src={'/svgs/editblue.svg'}
          className="h-4 w-4"
          width={15}
          height={15}
          alt="message"
        />{' '}
        <span className="hidden md:block">New Quiz</span>
      </button>
      <Link
        href={'/tutor/add-book'}
        className="border-2 border-gray-500 w-full whitespace-nowrap font-bold flex items-center gap-2 text-[0.7rem] text-gray-500 bg-transparent justify-center mb-1 px-1 rounded"
      >
        <span className="hidden md:block">Add Book</span>
      </Link>
    </div>
  );
};
