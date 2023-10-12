import Image from 'next/image';

export const MyVideoItem = ({ video }) => (
  <div className="min-h-64 relative border-2 border-subcolor  mb-6 w-ful p-4 bg-white shadow-md rounded-md">
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="black"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>
      <Image
        src={video?.thumbnail}
        alt={video?.thumbnail}
        width={300}
        height={200}
        className="rounded-md object-cover w-full h-40"
      />
    </div>
    <div className="mt-3 flex gap-2 items">
      <Image
        src="/demo-1.jpg"
        className="rounded-full mt-1 w-8 h-8 object-cover"
        width={32}
        height={32}
        alt="demo"
      />
      <div>
        <h1 className="text-lg font-semibold mb-[0.20rem] line-clamp-2">{video.title}</h1>
        <div className="flex items-center text-sm gap-2 text-gray-700">
          <span>{video.account}</span>
        </div>
        <div className="flex items-center text-sm gap-2 text-gray-700">
          <span>{video.views} views</span>
          <span>&bull;</span>
          <span>2 hours ago</span>
          <span>&bull;</span>
          <div className="flex items-center">
            4.7{' '}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="orange"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="none"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
