import React from 'react'
import Image from "next/image"

export const PodcastFeed = ({ title, avatar, sender, btnTxt, desc ,price}) => {
    return (
        <div className='flex flex-col px-4 pt-4 pb-3 bg-white shadow-md rounded-md mb-4 relative'>
            <div
                className={`flex md:flex-row flex-col  ${avatar ? "gap-4" : "gap-0"
                    }`}
            >
                <div className="">

                    <div className="relative">
                        <Image
                            className="rounded-md object-cover w-[40rem] h-[12rem]
        "
                            src={avatar}
                            alt="Course-details"
                            width={400}
                            height={200}
                        />
                    </div>

                </div>
                <div className="flex flex-col relative">


                    <div className="flex gap-2 flex-col">
                        <div className="text-gray-600 flex items-center gap-2">
                            <Image
                                src="/demo-4.jpg"
                                className="rounded-full w-[2.4rem] h-[2.4rem] object-cover"
                                width={100}
                                height={50}
                            />
                            {sender}{" "}
                        </div>

                        <h2 className="font-semibold text-xl mb-1">{title}</h2>

                        <p className="md:w-[90%] text-sm md:text-base mb-1">
                            {desc}
                        </p>
                    </div>

                    <div
                        className="flex gap-1 items-center flex-col text-sm absolute right-0
      "
                    >
                        <h2 className="font-extrabold gap-1 flex items-center">
                            4.7{" "}
                            <Image
                                src="/svgs/star.png"
                                className=""
                                width={24}
                                height={24}
                            />
                        </h2>
                        <p className="text-gray-600 text-[0.8rem] font-medium flex gap-1">
                            {" "}
                            24K <span>Views</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex md:flex-row flex-col justify-between mt-4'>
                <div className='flex gap-4 items-center'>
                    <p className='text-[#616161]'>Live on 22/05/23 - 09:30am</p>
                    <Image src={"/svgs/bell.svg"} alt='bell' width={18} height={18} />
                </div>
                <div className='flex gap-4 items-center '>
                    {price &&
                    <span className="absolute md:relative md:top-0 top-2 z-[1000] left-0 bg-green-700 md:bg-white text-white md:px-0 px-5 rounded-r-md md:text-green-700 py-1 md:rounded-md font-medium">
                        {price}$
                    </span>
    }
                    <button className='px-8 hover:bg-gray-700 hover:text-white transition-all duration-100 ease-in-out py-1 rounded-md border-gray-700 border-2 w-full md:mt-0 mt-3'>{btnTxt}</button>
                </div>
            </div>

        </div>
    )
}
