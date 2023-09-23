import React from 'react';
import Image from 'next/image';
export const Comments = ({ comments }) => {
  return (
    <div className="px-4 py-1 md:mt-0">
      {comments && comments.map((comment) => (
        <div key={comment.id} className="flex flex-col mb-4">
          <div className="flex gap-4">
            <Image
              src="/demo-4.jpg"
              alt="demo image"
              className="rounded-full w-[2.5rem] h-[2.5rem] object-cover"
              width={100}
              height={50}
            />

            <div className="flex gap-4 items-center max-w-[80%] w-fit">
              <div>
                <p className="text-sm md:text-base py-2 px-3 bg-gray-100 shadow-md w-fit">
                  {comment?.comment}
                </p>
                <div className="flex justify-between text-gray-500 mt-2">
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    <span className="text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">2 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 self-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/*reply*/}
          {/* {comment?.replies?.map((reply) => (
            <Reply key={reply.id} reply={reply} />
          ))} */}
        </div>
      ))}
    </div>
  );
};

const Reply = ({ reply }) => {
  return (
    <div className="md:ml-14 ml-7">
      <div className="flex gap-4 py-2 items-center">
        <Image
          src="/demo-2.jpg"
          alt="demo image"
          className="rounded-full self-start w-[2.5rem] h-[2.5rem]  object-cover"
          width={100}
          height={50}
        />

        <div className="flex gap-2 items-center">
          <div>
            <p className="text-sm md:text-base py-2 px-3 bg-gray-100 shadow-md w-fit">
              {reply.message}
            </p>
            <div className="flex justify-between text-gray-500 mt-2">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="text-sm">2</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">2 hour ago</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 self-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
              />
            </svg>
          </div>
        </div>
      </div>
      {reply?.replies && (
        <div className="ml-14">
          {reply?.replies.map((nestedReply) => (
            <Reply key={nestedReply.id} reply={nestedReply} />
          ))}
        </div>
      )}
    </div>
  );
};
